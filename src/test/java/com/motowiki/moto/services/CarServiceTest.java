package com.motowiki.moto.services;

import com.motowiki.moto.entities.Car;
import com.motowiki.moto.models.CarModel;
import com.motowiki.moto.repositories.car.CarRepository;
import com.motowiki.moto.repositories.car.CarRepositoryImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CarServiceTest {

    @Mock
    private CarRepository carRepository;
    private CarRepositoryImpl repositoryImpl;
    @InjectMocks
    private CarService underTest;

    @BeforeEach
    void setUp() {
        underTest = new CarService(carRepository, repositoryImpl);
    }

    @Test
    void canCreateCar() throws Exception {
        CarModel carModel = new CarModel("Audi","Germany", 1909, "");
        underTest.create(carModel);

        ArgumentCaptor<Car> carArgumentCaptor = ArgumentCaptor.forClass(Car.class);

        verify(carRepository).save(carArgumentCaptor.capture());

        Car capturedCar = carArgumentCaptor.getValue();

        assertThat(capturedCar.getBrand()).isEqualTo(carModel.getBrand());
        assertThat(capturedCar.getCountry()).isEqualTo(carModel.getCountry());
        assertThat(capturedCar.getStart_from()).isEqualTo(carModel.getStart_from());
        assertThat(capturedCar.getLogo()).isEqualTo(null);
    }

    @Test
    void createCarWithThrowExceptions() {
        CarModel carModel1 = new CarModel("Audi", "Germany", 1909, "");

        given(carRepository.findByBrand(carModel1.getBrand())).willReturn(new Car());

        assertThatThrownBy(() -> underTest.create(carModel1))
            .isInstanceOf(Exception.class)
            .hasMessageContaining("Car with this brand is already in a table");

        verify(carRepository, never()).save(any());
    }

    @Test
    void findById(){
        Car car = new Car(1, "Audi", "Germany", 1909, null);
        given(carRepository.findById((long) 1)).willReturn(Optional.of(car));
        underTest.findById(1);
        verify(carRepository).findById((long) 1);
    }

    @Test
    void findByBrand() {
        Car car = new Car(1, "Audi", "Germany", 1909, null);
        given(carRepository.findByBrand(car.getBrand())).willReturn(car);
        underTest.findByBrand(car.getBrand());
        verify(carRepository).findByBrand(car.getBrand());
    }

    @Test
    void canFindAll() {
        underTest.findAll();
        verify(carRepository).findAll();
    }

    @Test
    void updateOne() throws Exception {
        Car car = new Car(1, "Audi", "Germany", 1909, null);
        CarModel updatedCarModel = new CarModel("BMW", "Germany", 1916, "");

        given(carRepository.findById(car.getId())).willReturn(Optional.of(car));
        given(carRepository.findByBrand(updatedCarModel.getBrand())).willReturn(null);
        given(carRepository.save(car)).willReturn(car);

        Car expected = underTest.updateOne(1, new CarModel("BMW", "Germany", 1916, ""));

        assertThat(expected).isNotNull();

        verify(carRepository, times(2)).findById(car.getId());
        verify(carRepository).findByBrand(updatedCarModel.getBrand());
        verify(carRepository).save(car);

        assertThat(expected.getBrand()).isEqualTo("BMW");
        assertThat(expected.getCountry()).isEqualTo("Germany");
        assertThat(expected.getStart_from()).isEqualTo(1916);
    }

    @Test
    void updateOneWithThrowExceptions() {
        Car car = new Car(1, "Audi", "Germany", 1909, null);
        CarModel updatedCarModel = new CarModel("Audi", "Germany", 1916, "");

        given(carRepository.findById(car.getId())).willReturn(Optional.of(car));
        given(carRepository.findByBrand(updatedCarModel.getBrand())).willReturn(car);

        assertThatThrownBy(() -> underTest.updateOne(1, updatedCarModel))
                .isInstanceOf(Exception.class)
                .hasMessageContaining("Car with this brand is already in a table");

        verify(carRepository).findById(car.getId());
        verify(carRepository, never()).save(any());
    }

    @Test
    void deleteById() {
        underTest.deleteById(1);

        verify(carRepository).deleteById((long) 1);
    }

    @Test
    void deleteAll() {
        underTest.deleteAll();
        verify(carRepository).deleteAll();
    }

}