package com.motowiki.moto.repositories.car;

import com.motowiki.moto.config.TestConfig;
import com.motowiki.moto.entities.Car;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

import static org.springframework.test.util.AssertionErrors.assertEquals;

@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@DataJpaTest
@RunWith(SpringRunner.class)
@Import(TestConfig.class)
@TestPropertySource(locations="classpath:application-test.properties")
class CarRepositoryTest{


    @Autowired
    private CarRepository underTest;

    @Test
    void itShouldFindByBrand() {

        String expectedBrand = "Audi";
        Car car = new Car("Audi", "Germany", 1909);
        underTest.save(car);
        Car carExist = underTest.findByBrand("Audi");
        String brandFromCarExist = carExist.getBrand();
        assertEquals("Success", expectedBrand, brandFromCarExist);
    }
}