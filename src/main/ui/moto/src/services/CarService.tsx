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


    const response = await fetch(`/car/create`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
      })
      return await response.json();
}

export async function deleteCar(id: number){

    const token = localStorage.getItem('token');

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };


   try {
       await fetch(`/car/delete/${id}`, {
         method: "DELETE",
         headers: headers
       });
     } catch (error) {
        console.error("Error deleting car:", error);
       throw error;
     }
}

export async function updateCar(id: number, data: CarData){

   const token = localStorage.getItem('token');

    const headers = {
     'Content-Type': 'application/json',
     'Authorization': `Bearer ${token}`
    };

   try {

       await fetch(`/car/update/${id}`, {
         method: "PUT",
         headers: headers,
         body: JSON.stringify(data)
       });
     } catch (error) {
        console.error("Error updating car:", error);
       throw error;
     }
}