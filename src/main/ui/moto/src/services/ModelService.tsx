export interface ErrorResponse {
  error: string;
}

export interface ModelData {
  model: string;
  bodywork: string;
  car_class: string;
  price_from: string;
  equipment: string[];
  height: string;
  width: string;
  car_length: string;
  weight: string;
  images: string[];
  car_id: string;
}

export async function getAllModels(carId: number) {
    try{
        const response = await fetch(`/model/${carId}/list`);
        return await response.json();
    }catch (error) {
         console.error("Error list of models:", error);
          throw error;
    }
}

export async function getFindByModel(model: string) {

     const token = localStorage.getItem('token');

     const headers = {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${token}`
     };

    try{
        const response = await fetch(`/car/models/${model}`, {headers});
        return await response.json();
    }catch (error) {
         console.error("Error list of cars:", error);
          throw error;
    }
}

export async function createModel(data: ModelData) {
    const token = localStorage.getItem('token');

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    try{
        const response = await fetch(`/model/create`, {
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

export async function deleteModel(id: number){

    const token = localStorage.getItem('token');

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };


   try {
       const response = await fetch(`/model/delete/${id}`, {
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

export async function updateModel(id: number, data: ModelData){

   const token = localStorage.getItem('token');

    const headers = {
     'Content-Type': 'application/json',
     'Authorization': `Bearer ${token}`
    };

   try {

       const response = await fetch(`/model/update/${id}`, {
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