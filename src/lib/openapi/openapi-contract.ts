import { routeCatalog } from "@/lib/navigation/app-routes";
import type { OpenApiSurfaceArea } from "@/types/openapi";

const pathItemTaskId = "/api/tasks/{taskId}";
const pathItemPostId = "/api/posts/{postId}";

export const openApiSurfaceAreas: OpenApiSurfaceArea[] = [
  {
    tag: "auth",
    publicRoute: routeCatalog.login,
    apiRoute: routeCatalog.apiAuthSession,
    status: "implemented",
    summary: "Sessão JWT do proprietário via Auth.js Credentials.",
  },
  {
    tag: "posts",
    publicRoute: routeCatalog.dashboardBlog,
    apiRoute: routeCatalog.apiPosts,
    status: "implemented",
    summary: "Administração privada e persistida de posts do blog.",
  },
  {
    tag: "tasks",
    publicRoute: routeCatalog.dashboardTodo,
    apiRoute: routeCatalog.apiTasks,
    status: "implemented",
    summary: "CRUD privado de tarefas vinculado ao proprietário autenticado.",
  },
  {
    tag: "health",
    publicRoute: routeCatalog.docs,
    apiRoute: routeCatalog.apiHealth,
    status: "implemented",
    summary: "Healthcheck de liveness exposto pela própria aplicação.",
  },
  {
    tag: "contact",
    publicRoute: routeCatalog.contact,
    apiRoute: routeCatalog.apiContact,
    status: "implemented",
    summary: "Envio público de mensagens do formulário de contato via Resend.",
  },
];

const errorResponseContent = {
  "application/json": {
    schema: {
      $ref: "#/components/schemas/ErrorResponse",
    },
  },
} as const;

export const openApiContractScaffold = {
  openapi: "3.1.0",
  info: {
    title: "Bruno Mulim API",
    version: "0.1.0",
    description:
      "Contrato OpenAPI derivado das rotas internas reais do projeto. Sessão, contato público, tasks, posts e healthcheck são documentados apenas porque existem no app.",
  },
  servers: [{ url: "/" }],
  tags: openApiSurfaceAreas.map((surface) => ({
    name: surface.tag,
    description: surface.summary,
  })),
  paths: {
    [routeCatalog.apiAuthSession]: {
      get: {
        tags: ["auth"],
        summary: "Retorna a sessão atual do Auth.js",
        description:
          "Endpoint concreto exposto pelo catch-all do Auth.js em `/api/auth/[...nextauth]`. Sem sessão válida, retorna `null`. Com sessão válida, retorna a sessão JWT do administrador autenticado por credenciais próprias.",
        responses: {
          200: {
            description: "Sessão atual do navegador.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/AuthSessionResponse",
                },
              },
            },
          },
          500: {
            $ref: "#/components/responses/InternalServerError",
          },
        },
      },
    },
    [routeCatalog.apiHealth]: {
      get: {
        tags: ["health"],
        summary: "Executa o healthcheck de liveness",
        responses: {
          200: {
            description: "A aplicação está apta a responder requisições.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/HealthResponse",
                },
              },
            },
          },
        },
      },
    },
    [routeCatalog.apiContact]: {
      post: {
        tags: ["contact"],
        summary: "Envia a mensagem pública do formulário de contato",
        description:
          "Valida a entrada no servidor e entrega o email via Resend. Este endpoint não participa de auth, dashboard ou autenticação do proprietário.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ContactSubmissionInput",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Mensagem aceita e enviada para entrega por email.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ContactSubmissionResponse",
                },
              },
            },
          },
          400: {
            $ref: "#/components/responses/BadRequest",
          },
          502: {
            $ref: "#/components/responses/BadGateway",
          },
          503: {
            $ref: "#/components/responses/ServiceUnavailable",
          },
          500: {
            $ref: "#/components/responses/InternalServerError",
          },
        },
      },
    },
    [routeCatalog.apiTasks]: {
      get: {
        tags: ["tasks"],
        summary: "Lista as tarefas privadas do proprietário",
        description:
          "Retorna apenas tarefas cujo `ownerId` pertence à sessão autenticada.",
        responses: {
          200: {
            description: "Lista administrativa de tarefas.",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Task",
                  },
                },
              },
            },
          },
          401: {
            $ref: "#/components/responses/Unauthorized",
          },
          500: {
            $ref: "#/components/responses/InternalServerError",
          },
        },
      },
      post: {
        tags: ["tasks"],
        summary: "Cria uma nova tarefa privada",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/TaskEditorInput",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Tarefa criada com sucesso.",
            headers: {
              Location: {
                description: "URL da tarefa recém-criada.",
                schema: {
                  type: "string",
                },
              },
            },
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Task",
                },
              },
            },
          },
          400: {
            $ref: "#/components/responses/BadRequest",
          },
          401: {
            $ref: "#/components/responses/Unauthorized",
          },
          500: {
            $ref: "#/components/responses/InternalServerError",
          },
        },
      },
    },
    [pathItemTaskId]: {
      patch: {
        tags: ["tasks"],
        summary: "Atualiza uma tarefa privada existente",
        parameters: [
          {
            name: "taskId",
            in: "path",
            required: true,
            description: "Identificador da tarefa privada do proprietário.",
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/TaskEditorInput",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Tarefa atualizada com sucesso.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Task",
                },
              },
            },
          },
          400: {
            $ref: "#/components/responses/BadRequest",
          },
          401: {
            $ref: "#/components/responses/Unauthorized",
          },
          404: {
            $ref: "#/components/responses/NotFound",
          },
          500: {
            $ref: "#/components/responses/InternalServerError",
          },
        },
      },
      delete: {
        tags: ["tasks"],
        summary: "Exclui uma tarefa privada existente",
        parameters: [
          {
            name: "taskId",
            in: "path",
            required: true,
            description: "Identificador da tarefa privada do proprietário.",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Tarefa removida com sucesso.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/DeleteSuccessResponse",
                },
              },
            },
          },
          400: {
            $ref: "#/components/responses/BadRequest",
          },
          401: {
            $ref: "#/components/responses/Unauthorized",
          },
          404: {
            $ref: "#/components/responses/NotFound",
          },
          500: {
            $ref: "#/components/responses/InternalServerError",
          },
        },
      },
    },
    [routeCatalog.apiPosts]: {
      get: {
        tags: ["posts"],
        summary: "Lista todos os posts privados do proprietário",
        description:
          "Retorna rascunhos e publicados do proprietário autenticado para administração editorial.",
        responses: {
          200: {
            description: "Lista administrativa de posts.",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Post",
                  },
                },
              },
            },
          },
          401: {
            $ref: "#/components/responses/Unauthorized",
          },
          500: {
            $ref: "#/components/responses/InternalServerError",
          },
        },
      },
      post: {
        tags: ["posts"],
        summary: "Cria um novo post privado",
        description:
          "O slug é normalizado no servidor e o `publishedAt` é calculado conforme o status editorial.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/PostEditorInput",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Post criado com sucesso.",
            headers: {
              Location: {
                description: "URL do post recém-criado.",
                schema: {
                  type: "string",
                },
              },
            },
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Post",
                },
              },
            },
          },
          400: {
            $ref: "#/components/responses/BadRequest",
          },
          401: {
            $ref: "#/components/responses/Unauthorized",
          },
          409: {
            $ref: "#/components/responses/Conflict",
          },
          500: {
            $ref: "#/components/responses/InternalServerError",
          },
        },
      },
    },
    [pathItemPostId]: {
      get: {
        tags: ["posts"],
        summary: "Busca um post privado específico",
        parameters: [
          {
            name: "postId",
            in: "path",
            required: true,
            description: "Identificador do post privado do proprietário.",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Post encontrado.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Post",
                },
              },
            },
          },
          400: {
            $ref: "#/components/responses/BadRequest",
          },
          401: {
            $ref: "#/components/responses/Unauthorized",
          },
          404: {
            $ref: "#/components/responses/NotFound",
          },
          500: {
            $ref: "#/components/responses/InternalServerError",
          },
        },
      },
      patch: {
        tags: ["posts"],
        summary: "Atualiza um post privado existente",
        description:
          "Ao publicar, `publishedAt` passa a ser definido; ao despublicar, retorna para `null`.",
        parameters: [
          {
            name: "postId",
            in: "path",
            required: true,
            description: "Identificador do post privado do proprietário.",
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/PostEditorInput",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Post atualizado com sucesso.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Post",
                },
              },
            },
          },
          400: {
            $ref: "#/components/responses/BadRequest",
          },
          401: {
            $ref: "#/components/responses/Unauthorized",
          },
          404: {
            $ref: "#/components/responses/NotFound",
          },
          409: {
            $ref: "#/components/responses/Conflict",
          },
          500: {
            $ref: "#/components/responses/InternalServerError",
          },
        },
      },
      delete: {
        tags: ["posts"],
        summary: "Exclui um post privado existente",
        parameters: [
          {
            name: "postId",
            in: "path",
            required: true,
            description: "Identificador do post privado do proprietário.",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Post removido com sucesso.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/DeleteSuccessResponse",
                },
              },
            },
          },
          400: {
            $ref: "#/components/responses/BadRequest",
          },
          401: {
            $ref: "#/components/responses/Unauthorized",
          },
          404: {
            $ref: "#/components/responses/NotFound",
          },
          500: {
            $ref: "#/components/responses/InternalServerError",
          },
        },
      },
    },
  },
  components: {
    schemas: {
      AuthSessionResponse: {
        oneOf: [
          {
            $ref: "#/components/schemas/AuthSession",
          },
          {
            type: "null",
          },
        ],
      },
      AuthSession: {
        type: "object",
        required: ["user", "expires"],
        properties: {
          user: {
            $ref: "#/components/schemas/AuthSessionUser",
          },
          expires: {
            type: "string",
            format: "date-time",
          },
        },
      },
      AuthSessionUser: {
        type: "object",
        required: ["id", "email", "isOwner"],
        properties: {
          id: {
            type: "string",
          },
          email: {
            type: "string",
            format: "email",
          },
          isOwner: {
            type: "boolean",
            const: true,
          },
          name: {
            type: ["string", "null"],
          },
          image: {
            type: ["string", "null"],
            format: "uri",
          },
        },
      },
      HealthResponse: {
        type: "object",
        required: ["status", "timestamp"],
        properties: {
          status: {
            type: "string",
            enum: ["ok"],
          },
          timestamp: {
            type: "string",
            format: "date-time",
          },
        },
      },
      ContactSubmissionInput: {
        type: "object",
        required: ["name", "email", "subject", "message"],
        properties: {
          name: {
            type: "string",
            minLength: 2,
            maxLength: 80,
          },
          email: {
            type: "string",
            format: "email",
          },
          subject: {
            type: "string",
            minLength: 3,
            maxLength: 120,
          },
          message: {
            type: "string",
            minLength: 10,
            maxLength: 5000,
          },
        },
      },
      ContactSubmissionResponse: {
        type: "object",
        required: ["success", "id"],
        properties: {
          success: {
            type: "boolean",
            const: true,
          },
          id: {
            type: ["string", "null"],
          },
        },
      },
      PostStatus: {
        type: "string",
        enum: ["draft", "published"],
      },
      TaskStatus: {
        type: "string",
        enum: ["todo", "in_progress", "done"],
      },
      Post: {
        type: "object",
        required: [
          "id",
          "title",
          "slug",
          "excerpt",
          "content",
          "status",
          "publishedAt",
          "authorId",
          "createdAt",
          "updatedAt",
        ],
        properties: {
          id: {
            type: "string",
          },
          title: {
            type: "string",
          },
          slug: {
            type: "string",
          },
          excerpt: {
            type: "string",
          },
          content: {
            type: "string",
            description: "Markdown puro persistido no banco.",
          },
          status: {
            $ref: "#/components/schemas/PostStatus",
          },
          publishedAt: {
            type: ["string", "null"],
            format: "date-time",
            description:
              "Recebe data ao publicar e volta para `null` ao despublicar.",
          },
          authorId: {
            type: "string",
          },
          createdAt: {
            type: "string",
            format: "date-time",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
          },
        },
      },
      PostEditorInput: {
        type: "object",
        required: ["title"],
        properties: {
          title: {
            type: "string",
            maxLength: 180,
          },
          slug: {
            type: ["string", "null"],
            maxLength: 200,
            description:
              "Opcional. Quando vazio, o servidor deriva um slug a partir do título.",
          },
          excerpt: {
            type: ["string", "null"],
            maxLength: 320,
          },
          content: {
            type: ["string", "null"],
            maxLength: 50000,
            description: "Markdown puro do post.",
          },
          status: {
            $ref: "#/components/schemas/PostStatus",
          },
        },
      },
      Task: {
        type: "object",
        required: [
          "id",
          "ownerId",
          "title",
          "description",
          "status",
          "dueAt",
          "createdAt",
          "updatedAt",
        ],
        properties: {
          id: {
            type: "string",
          },
          ownerId: {
            type: "string",
          },
          title: {
            type: "string",
          },
          description: {
            type: ["string", "null"],
          },
          status: {
            $ref: "#/components/schemas/TaskStatus",
          },
          dueAt: {
            type: ["string", "null"],
            format: "date-time",
          },
          createdAt: {
            type: "string",
            format: "date-time",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
          },
        },
      },
      TaskEditorInput: {
        type: "object",
        required: ["title"],
        properties: {
          title: {
            type: "string",
            maxLength: 140,
          },
          description: {
            type: ["string", "null"],
            maxLength: 2000,
          },
          status: {
            $ref: "#/components/schemas/TaskStatus",
          },
          dueAt: {
            type: ["string", "null"],
            format: "date-time",
          },
        },
      },
      DeleteSuccessResponse: {
        type: "object",
        required: ["success"],
        properties: {
          success: {
            type: "boolean",
            const: true,
          },
        },
      },
      ErrorResponse: {
        type: "object",
        required: ["error"],
        properties: {
          error: {
            type: "string",
          },
          issues: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
      },
    },
    responses: {
      BadRequest: {
        description: "Payload, parâmetro ou JSON inválido.",
        content: errorResponseContent,
      },
      Unauthorized: {
        description: "Sessão do proprietário ausente ou não autorizada.",
        content: errorResponseContent,
      },
      NotFound: {
        description: "Recurso não encontrado para o proprietário autenticado.",
        content: errorResponseContent,
      },
      Conflict: {
        description: "Conflito de unicidade ou estado, como slug já utilizado.",
        content: errorResponseContent,
      },
      BadGateway: {
        description: "Falha do provedor externo ao entregar o email.",
        content: errorResponseContent,
      },
      ServiceUnavailable: {
        description: "Fluxo indisponível por configuração incompleta no servidor.",
        content: errorResponseContent,
      },
      InternalServerError: {
        description: "Falha inesperada ao processar a operação.",
        content: errorResponseContent,
      },
    },
  },
} as const;
