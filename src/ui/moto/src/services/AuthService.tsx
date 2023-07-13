export interface ErrorResponse {
  error: string;
}

export interface RegisterData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
}

export interface AuthData {
  email: string;
  password: string;
}

export interface UserData {
  firstName: string;
  lastName: string;
  role: string;
}



export async function register(data: RegisterData) {
    try{
    const response = await fetch(`/api/v1/auth/register`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })

       if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.message);
        }
      return await response.json();
    }catch(e: any ){
        return { error: e.message } as ErrorResponse
    }
}

export async function authentication(data: AuthData): Promise<any | ErrorResponse> {
    try{
        const response = await fetch(`/api/v1/auth/authenticate`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
          })

          if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message);
              }
          return await response.json();
      }catch(e: any ){
        return { error: e.message } as ErrorResponse
      }
}

export async function refreshAccessToken(refreshToken: string) {
      try {
            const response = await fetch('/refresh-token', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ refresh_token: refreshToken }),
                });

            if (response.ok) {
                  const data = await response.json();
                  const newAccessToken = data.access_token;

                  localStorage.access_token = newAccessToken;
            } else {
                  throw new Error('Trouble with generating refresh token');
            }
      } catch (error) {
      }
    };

export async function getUserInfo() {

    const token = localStorage.getItem('access_token');
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    try{
        const response = await fetch('/api/v1/auth/userInfo', { headers });
        return await response.json();
    }catch (error) {
          throw error;
    }
}

export async function logout() {
    try{
        const token = localStorage.getItem('token');
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        };

        const response = await fetch(`/api/v1/auth/logout`, { headers });
        return await response.json();
    } catch(error) {
    }
}