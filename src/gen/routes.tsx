// ATENÇÃO: Arquivo gerado automaticamente pelo fsbox-tsx.Cli. Não alterar!
/**
 * Gera todas as rotas baseadas no @page nas páginas no diretório src/pages
 * Os arquivos devem iniciar com @page /path/para/rota
 * Se for um caminho que requer login, utilize + antes do path: @page +/cadastro/cliente
 */

import React from "react";
import PageComponents from "src/page-components";

export default [
  {
    path: "/home",
    element: (
      <React.Suspense fallback={<div>Loading...</div>}>
        {React.createElement(PageComponents.Home)}
      </React.Suspense>
    ),
    meta: { auth: false, name: "Home" }
  },
  {
    path: "/",
    element: (
      <React.Suspense fallback={<div>Loading...</div>}>
        {React.createElement(PageComponents.Index)}
      </React.Suspense>
    ),
    meta: { auth: false, name: "Index" }
  },
  {
    path: "/to-do-list",
    element: (
      <React.Suspense fallback={<div>Loading...</div>}>
        {React.createElement(PageComponents.To_do_list)}
      </React.Suspense>
    ),
    meta: { auth: false, name: "To_do_list" }
  }
];