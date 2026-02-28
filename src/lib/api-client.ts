import { toast } from "sonner"

type ApiResponse<T> = {
  success: boolean
  data?: T
  error?: string
}

class ApiClient {
  private async request<T>(
    url: string,
    options: RequestInit
  ): Promise<T> {
    const res = await fetch(url, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    })


    let isRedirecting = false

    if (res.status === 401) {
      toast.error("Session expired")

      if (
        typeof window !== "undefined" &&
        window.location.pathname !== "/login" &&
        !isRedirecting
      ) {
        isRedirecting = true
        window.location.href = "/login"
      }

      throw new Error("Unauthorized")
    }
    const data = await res.json().catch(() => null)
    if (!res.ok) {
      toast.error(data.error || "Something went wrong")
      throw new Error(data.error)
    }

    return data.data as T
  }

  get<T>(url: string) {
    return this.request<T>(url, {
      method: "GET",
    })
  }

  post<T>(url: string, body?: unknown) {
    return this.request<T>(url, {
      method: "POST",
      body: JSON.stringify(body),
    })
  }

  put<T>(url: string, body?: unknown) {
    return this.request<T>(url, {
      method: "PUT",
      body: JSON.stringify(body),
    })
  }

  delete<T>(url: string) {
    return this.request<T>(url, {
      method: "DELETE",
    })
  }
}

export const api = new ApiClient()