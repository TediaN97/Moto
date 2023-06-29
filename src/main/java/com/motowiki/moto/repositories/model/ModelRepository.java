package com.motowiki.moto.repositories.model;

import com.motowiki.moto.entities.Car;
import com.motowiki.moto.entities.Model;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ModelRepository extends JpaRepository<Model, Long> {

    @Modifying
    @Transactional
    @Query(value = "UPDATE Model m SET m.car = :car WHERE m.id = :id", nativeQuery = true)
    void updateById(@Param("car") Car car, @Param("id") long id);

    List<Model> findAllById(long car_id);
}