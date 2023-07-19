package com.motowiki.moto.controllers;

import com.motowiki.moto.entities.Car;
import com.motowiki.moto.services.CarService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.CoreMatchers.is;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(controllers = CarController.class)
@AutoConfigureMockMvc(addFilters = false)
@ExtendWith(MockitoExtension.class)
class CarControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CarService underTest;


    private List<Car> carList;


    @BeforeEach
    void setUp() {

        this.carList = new ArrayList<>();
        this.carList.add(new Car(1, "Audi", "Germany", 1909, null));
        this.carList.add(new Car(2, "BMW", "Germany", 1916, null));
        this.carList.add(new Car(3, "Skoda", "Czechia", 1895, null));
    }

    @Test
    @Disabled
    void createProduct() {
    }

    @Test
    @Disabled
    void getOneProduct() {
    }

    @Test
    @Disabled
    void getCarByBrand() {
    }

    @Test
    void getAllProducts() throws Exception {

        given(underTest.findAll()).willReturn(carList);

        this.mockMvc.perform(get("/car/list"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()", is(carList.size())));

    }

    @Test
    @Disabled
    void updateOneProduct() {
    }

    @Test
    @Disabled
    void deleteOneProduct() {
    }

    @Test
    @Disabled
    void deleteAllProducts() {
    }
}