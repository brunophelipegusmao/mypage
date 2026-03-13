export const routeCatalog = {
  home: "/",
  services: "/services",
  portfolio: "/portfolio",
  blog: "/blog",
  blogPost: (slug: string) => `/blog/${slug}`,
  contact: "/contact",
  login: "/login",
  dashboard: "/dashboard",
  dashboardTodo: "/dashboard/todo",
  dashboardBlog: "/dashboard/blog",
  dashboardNewBlogPost: "/dashboard/blog/new",
  dashboardEditBlogPost: (slug: string) => `/dashboard/blog/${slug}`,
  apiAuthSession: "/api/auth/session",
  apiContact: "/api/contact",
  apiHealth: "/api/health",
  apiTasks: "/api/tasks",
  apiTask: (taskId: string) => `/api/tasks/${taskId}`,
  apiPosts: "/api/posts",
  apiPost: (postId: string) => `/api/posts/${postId}`,
  docs: "/docs",
  openApiSpec: "/api/openapi.json",
} as const;

export const publicSiteNavigation = [
  { href: routeCatalog.services, label: "Serviços" },
  { href: routeCatalog.portfolio, label: "Portfólio" },
  { href: routeCatalog.blog, label: "Blog" },
  { href: routeCatalog.contact, label: "Contato" },
] as const;

export const dashboardNavigation = [
  { href: routeCatalog.dashboard, label: "Visão Geral" },
  { href: routeCatalog.dashboardTodo, label: "To-do" },
  { href: routeCatalog.dashboardBlog, label: "Blog" },
] as const;
