package com.motowiki.moto.repositories.car;

import com.motowiki.moto.config.TestConfig;
import com.motowiki.moto.entities.Car;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

import static org.springframework.test.util.AssertionErrors.assertEquals;

@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@DataJpaTest
@RunWith(SpringRunner.class)
@Import(TestConfig.class)
@TestPropertySource(locations="classpath:application-test.properties")
class CarRepositoryTest{


    @Autowired
    private CarRepository underTest;

    private Car car;

    @BeforeEach
    public void setup(){
        car = Car.builder()
                .brand("Audi")
                .country("Germany")
                .start_from(1909)
                .build();
    }

    @DisplayName("JUnit test for save car operation")
    @Test
    public void givenCarObject_whenSave_thenReturnSavedCar(){
        Car car = Car.builder()
                .brand("Audi")
                .country("Germany")
                .start_from(1909)
                .build();
        Car savedCar = underTest.save(car);

        assertThat(savedCar).isNotNull();
        assertThat(savedCar.getId()).isGreaterThan(0);
    }

    @DisplayName("JUnit test for get all cars operation")
    @Test
    public void givenCarsList_whenFindAll_thenCarsList(){
        // given - precondition or setup

        Car car1 = Car.builder()
                .brand("BMW")
                .country("Germany")
                .start_from(1916)
                .build();

        underTest.save(car);
        underTest.save(car1);

        List<Car> employeeList = underTest.findAll();

        assertThat(employeeList).isNotNull();
        assertThat(employeeList.size()).isEqualTo(2);

    }

    @DisplayName("JUnit test for get car by id operation")
    @Test
    public void givenCarObject_whenFindById_thenReturnCarObject(){

        underTest.save(car);

        Optional<Car> carDB = underTest.findById(car.getId());

        assertThat(carDB).isNotNull();
    }

    @DisplayName("JUnit test for get car by id operation is false")
    @Test
    public void CarObjectIsEmpty_whenFindById_thenReturnEmpty(){

        Optional<Car> carDB = underTest.findById((long) 1);

        assertThat(carDB).isEmpty();
    }

    @DisplayName("JUnit test for get car by brand operation")
    @Test
    public void givenCarObject_whenFindByBrand_thenReturnCarObject(){

        underTest.save(car);

        Car carDB = underTest.findByBrand(car.getBrand());

        assertThat(carDB).isNotNull();
    }

    @DisplayName("JUnit test for get car by brand operation, but brand is not exist")
    @Test
    public void CarObjectIsNull_whenFindByBrand_thenReturnNull(){

        underTest.save(car);

        Car carDB = underTest.findByBrand("BMW");

        assertThat(carDB).isNull();
    }

    @DisplayName("JUnit test for update car operation")
    @Test
    public void givenCarObject_whenUpdateCar_thenReturnUpdatedCar(){

        underTest.save(car);

        Car savedCar = underTest.findById(car.getId()).get();
        savedCar.setBrand("BMW");
        savedCar.setCountry("Czechia");
        Car updatedEmployee =  underTest.save(savedCar);

        // then - verify the output
        assertThat(updatedEmployee.getBrand()).isEqualTo("BMW");
        assertThat(updatedEmployee.getCountry()).isEqualTo("Czechia");
    }

    @DisplayName("JUnit test for delete car operation")
    @Test
    public void givenCarObject_whenDelete_thenRemoveCar() {

        underTest.save(car);

        underTest.deleteById(car.getId());
        Optional<Car> employeeOptional = underTest.findById(car.getId());

        assertThat(employeeOptional).isEmpty();
    }
}