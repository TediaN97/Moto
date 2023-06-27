export interface ErrorResponse {
  error: string;
}

export interface CarData {
  brand: string;
  country: string;
  start_from: string;
  logo?: string;
}

export async function getAllCars() {
    try{
        const response = await fetch('/car/list');
        return await response.json();
    }catch (error) {
         console.error("Error list of cars:", error);
          throw error;
    }
}

export async function createCar(data: CarData) {
    const token = localStorage.getItem('token');

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    try{
        const response = await fetch(`/car/create`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
          })

           if (!response.ok) {
              const errorResponse = await response.json();
              throw new Error(errorResponse.message);
          }

          return await response.json();
    } catch(e: any ){
          return { error: e.message } as ErrorResponse
    }
}

export async function deleteCar(id: number){

    const token = localStorage.getItem('token');

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };


   try {
       const response = await fetch(`/car/delete/${id}`, {
         method: "DELETE",
         headers: headers
       });

       if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
       }
       return await response.json();

     } catch(e: any ){
            return { error: e.message } as ErrorResponse
      }
}

export async function updateCar(id: number, data: CarData){

   const token = localStorage.getItem('token');

    const headers = {
     'Content-Type': 'application/json',
     'Authorization': `Bearer ${token}`
    };

   try {

       const response = await fetch(`/car/update/${id}`, {
         method: "PUT",
         headers: headers,
         body: JSON.stringify(data)
       });

       if (!response.ok) {
         const errorResponse = await response.json();
         throw new Error(errorResponse.message);
      }
      return await response.json();

   } catch(e: any ){
         return { error: e.message } as ErrorResponse
   }
}