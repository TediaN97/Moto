package com.motowiki.moto.repositories.car;

import com.motowiki.moto.entities.Car;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {
    @Modifying
    @Transactional
    @Query(value = "UPDATE car SET brand = ?1, country = ?2, start_from = ?3 WHERE id = ?4", nativeQuery = true)
    void updateById(String brand, String country, Integer start_from, long id);

}
