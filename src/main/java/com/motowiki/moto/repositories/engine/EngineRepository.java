package com.motowiki.moto.repositories.engine;

import com.motowiki.moto.entities.Engine;
import com.motowiki.moto.entities.Model;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface EngineRepository extends JpaRepository<Engine, Long> {

//    @Modifying
//    @Transactional
//    @Query(value = "UPDATE engine SET model = ?1, engine_volume = ?2, maximum_performance = ?3, gearbox = ?4, fuel = ?5, acceleration_from_0_to_100 = ?6, drive_type = ?7, kind_of_drive = ?8, combined_consumption_from = ?9, combined_consumption_to = ?10, CO2_emissions_from = ?11, CO2_emissions_to = ?12, maximum_speed = ?13, maximum_torque = ?14 WHERE id = ?15", nativeQuery = true)
//    void updateById(Model model, String engine_volume, Integer maximum_performance, String gearbox, String fuel, Float acceleration_from_0_to_100, String drive_type, String kind_of_drive, Integer combined_consumption_from, Integer combined_consumption_to, Integer CO2_emissions_from, Integer CO2_emissions_to, Integer maximum_speed, Integer maximum_torque, long id);

}
