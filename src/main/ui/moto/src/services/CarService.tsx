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