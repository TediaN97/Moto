package com.motowiki.moto.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.motowiki.moto.config.TestConfig;
import com.motowiki.moto.entities.Car;
import com.motowiki.moto.models.CarModel;
import com.motowiki.moto.repositories.token.TokenRepository;
import com.motowiki.moto.repositories.user.UserRepository;
import com.motowiki.moto.services.CarService;
import org.hamcrest.CoreMatchers;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.api.extension.Extension;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertEquals;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(controllers = CarController.class)
@AutoConfigureMockMvc(addFilters = false)
@ExtendWith(MockitoExtension.class)
@ContextConfiguration(classes = {CarController.class, CarService.class, TestConfig.class })
class CarControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private CarService underTest;

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private TokenRepository tokenRepository;

    private List<Car> carList;

    private Car carEntity;

    @BeforeEach
    void setUp() {

        this.carList = new ArrayList<>();
        this.carList.add(new Car(1, "Audi", "Germany", 1909, null));
        this.carList.add(new Car(2, "BMW", "Germany", 1916, null));
        this.carList.add(new Car(3, "Skoda", "Czechia", 1895, null));
    }

    @Test
    void createProduct() throws Exception {

        CarModel car = new CarModel("Audi", "Germany", 1909, null);

        given(underTest.create(car)).willReturn(new Car(1, "Audi", "Germany", 1909, null));

        String carJson = objectMapper.writeValueAsString(car);

        ResultActions result = this.mockMvc.perform(post("/car/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(carJson));

        result.andExpect(status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("$.brand", CoreMatchers.is(car.getBrand())))
                .andExpect(MockMvcResultMatchers.jsonPath("$.country", CoreMatchers.is(car.getCountry())));
    }

    @Test
    void getOneProduct() throws Exception {
        given(underTest.findById(carList.get(0).getId())).willReturn(carList.get(0));

        this.mockMvc.perform(get("/car/"+ "1"))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    void getCarByBrand() throws Exception {
        given(underTest.findByBrand(carList.get(0).getBrand())).willReturn(carList.get(0));

        this.mockMvc.perform(get("/car/models/"+ "Audi"))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    void getAllProducts() throws Exception {

        given(underTest.findAll()).willReturn(carList);

        this.mockMvc.perform(get("/car/list"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()", is(carList.size())));
    }

    @Test
    void updateOneProduct() throws Exception {
        CarModel carModelBMW = new CarModel("BMW", "Germany", 1916, null);
        Car car = new Car(1, "BMW", "Germany", 1916, null);

        when(underTest.updateOne(1, carModelBMW)).thenReturn(car);

        ObjectMapper objectMapper = new ObjectMapper();
        String carJson = objectMapper.writeValueAsString(carModelBMW);

        ResultActions result = this.mockMvc.perform(put("/car/update/"+"1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(carJson));

        result.andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.brand", CoreMatchers.is(car.getBrand())))
                .andExpect(MockMvcResultMatchers.jsonPath("$.country", CoreMatchers.is(car.getCountry())));
    }

    @Test
    void deleteOneProduct() throws Exception {
        doNothing().when(underTest).deleteById(1);

        ResultActions result = mockMvc.perform(delete("/car/delete/" + "1"));

        result.andExpect(status().isNoContent());
    }

    @Test
    void deleteAllProducts() throws Exception {
        doNothing().when(underTest).deleteAll();
        ResultActions result = mockMvc.perform(delete("/car/delete/all"));
        result.andExpect(status().isNoContent());
    }
}