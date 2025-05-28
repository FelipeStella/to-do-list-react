import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  ReactNode,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { ErrorsContext, LabelWidthContext } from "src/contexts/FormContexts";

// Tipagem para erro
type ErrorFormItem = {
  field: string;
  message: string;
};

type FormProps = {
  model?: any;
  labelWidth?: number | string;
  loading?: boolean;
  children?: ReactNode;
};

export interface FormHandle {
  validate: () => Promise<ErrorFormItem[]>;
  validateReset: () => void;
}

// Função para resolver path dentro do objeto (ex: "user.name")
function resolvePath(obj: any, field: string, defaultValue?: any): any {
  if (field === "*") return obj;
  return field
    .split(/[.[\]'"]/)
    .filter((p) => p)
    .reduce((o, p) => (o ? o[p] : defaultValue), obj);
}

// Função para validar os filhos (React children) e o modelo
function validateListItem(
  errorList: ErrorFormItem[],
  data: any,
  items: ReactNode
) {
  // Percorrer os filhos e validar
  React.Children.forEach(items, (child: any) => {
    if (!child?.props) return;

    const { field, required, validate } = child.props;
    const value = !field ? data : resolvePath(data, field);
    const isEmpty =
      value === null ||
      value === undefined ||
      (typeof value === "string" && value.trim().length === 0);

    if (isEmpty && required !== false && required !== undefined) {
      errorList.push({
        field,
        message: "Campo obrigatório",
      });
    }
    if (validate && !isEmpty) {
      const result = validate(value);
      if (result !== true) {
        errorList.push({
          field,
          message: String(result),
        });
      }
    }

    // Se tiver filhos aninhados, validar recursivamente
    if (child.props.children) {
      validateListItem(errorList, data, child.props.children);
    }
  });
}

export const Form = forwardRef<FormHandle, FormProps>(
  ({ model, labelWidth, loading = false, children }, ref) => {
    const formRef = useRef<HTMLFormElement>(null);
    const [showErrors, setShowErrors] = useState(false);
    const [errors, setErrors] = useState<ErrorFormItem[]>([]);

    // Função para scroll e foco no primeiro campo com erro
    const scrollToError = useCallback((firstErrorField: string) => {
      if (!firstErrorField) return;
      const errorFieldElement = formRef.current?.querySelector(
        `[name="${firstErrorField}"]`
      ) as HTMLElement | null;

      if (errorFieldElement) {
        errorFieldElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        const focusableElements = errorFieldElement.querySelectorAll<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >("input, textarea, select");

        if (focusableElements.length > 0) {
          try {
            focusableElements[0].focus();
          } catch (error) {
            console.error("Erro ao tentar focar o elemento:", error);
          }
        }
      }
    }, []);

    // Função para validar dataset e calcular erros
    const validateDataset = useCallback(
      (data: any, scrollToFieldError = true) => {
        const errorList: ErrorFormItem[] = [];
        validateListItem(errorList, data, children);

        if (errorList.length > 0 && scrollToFieldError) {
          scrollToError(errorList[0].field);
        }

        return errorList;
      },
      [children, scrollToError]
    );

    // Método público para validar
    const validate = useCallback(async (): Promise<ErrorFormItem[]> => {
      if (!model) {
        alert("Formulário sem declaração de modelo.\n\n<Form model={{}} />");
        return [];
      }

      setShowErrors(true);

      // Clona modelo para evitar alterações externas
      const plain = JSON.parse(JSON.stringify(model));
      const newErrors = validateDataset(plain);
      setErrors(newErrors);
      return newErrors;
    }, [model, validateDataset]);

    // Método para resetar erros
    const validateReset = useCallback(() => {
      setErrors([]);
      setShowErrors(false);
    }, []);

    // Evita envio do formulário
    useEffect(() => {
      const currentForm = formRef.current;
      if (!currentForm) return;

      const onSubmit = (e: Event) => {
        e.preventDefault();
        return false;
      };
      currentForm.addEventListener("submit", onSubmit);
      return () => currentForm.removeEventListener("submit", onSubmit);
    }, []);

    useImperativeHandle(ref, () => ({
      validate,
      validateReset,
    }));

    return (
      <ErrorsContext.Provider value={errors}>
        <LabelWidthContext.Provider value={labelWidth}>
          <Box
            component="form"
            ref={formRef}
            noValidate
            sx={{ position: "relative" }}>
            {loading && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 2,
                }}>
                <CircularProgress size={20} />
                <Typography>Aguarde...</Typography>
              </Box>
            )}
            <Box
              sx={{
                opacity: loading ? 0.5 : 1,
                pointerEvents: loading ? "none" : "auto",
              }}>
              {children}
            </Box>
            {/* Mostrar mensagens de erro só se showErrors for true e existir erros */}
            {showErrors && errors.length > 0 && (
              <Box sx={{ mt: 2, color: "error.main" }}>
                {errors.map((err) => (
                  <Typography key={err.field}>
                    {err.field}: {err.message}
                  </Typography>
                ))}
              </Box>
            )}
          </Box>
        </LabelWidthContext.Provider>
      </ErrorsContext.Provider>
    );
  }
);

Form.displayName = "Form";
