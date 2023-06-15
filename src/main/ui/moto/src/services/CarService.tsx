export interface CarData {
  brand: string;
  country: string;
  start_from: string;
  logo?: string;
}

export async function getAllCars() {

    const response = await fetch('/car/list');
    return await response.json();
}

export async function createCar(data: CarData) {
    const response = await fetch(`/car/create`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
      return await response.json();
}

export async function deleteCar(id: number){
   try {
       await fetch(`/car/delete/${id}`, {
         method: "DELETE",
         headers: {
           "Content-Type": "application/json",
         },
       });
     } catch (error) {
        console.error("Error deleting car:", error);
       throw error;
     }
}

export async function updateCar(id: number, data: CarData){
   try {

       await fetch(`/car/update/${id}`, {
         method: "PUT",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify(data)
       });
     } catch (error) {
        console.error("Error updating car:", error);
       throw error;
     }
}