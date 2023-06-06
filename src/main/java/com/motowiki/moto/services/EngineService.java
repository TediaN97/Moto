package com.motowiki.moto.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.fge.jsonpatch.JsonPatch;
import com.github.fge.jsonpatch.JsonPatchException;
import com.motowiki.moto.entities.Car;
import com.motowiki.moto.entities.Engine;
import com.motowiki.moto.entities.Model;
import com.motowiki.moto.models.EngineModel;
import com.motowiki.moto.repositories.engine.EngineRepository;
import com.motowiki.moto.repositories.engine.EngineRepositoryImpl;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Objects;

@Service
public class EngineService {
    private final EngineRepository repository;
    private final EngineRepositoryImpl repositoryImpl;

    @Autowired
    private ModelService modelService;

    public EngineService(EngineRepository repository, EngineRepositoryImpl repositoryImpl) {
        this.repository = repository;
        this.repositoryImpl = repositoryImpl;
    }

    public Engine create(EngineModel engine) throws Exception {
        List<Engine> listOfEngines = findAll();
        for(Engine checkEngine : listOfEngines){
            if(Objects.equals(engine.getEngine_volume(), checkEngine.getEngine_volume()) && Objects.equals(engine.getGearbox(), checkEngine.getGearbox())){
                throw new Exception("Engine with this engine volume is already in a table");
            }
        }

        Model getModel = modelService.findById(engine.getModel_id());

        Engine engineToSave = Engine.builder()
                .model(getModel)
                .engine_volume(engine.getEngine_volume())
                .maximum_performance(engine.getMaximum_performance())
                .gearbox(engine.getGearbox())
                .fuel(engine.getFuel())
                .acceleration_from_0_to_100(engine.getAcceleration_from_0_to_100())
                .drive_type(engine.getDrive_type())
                .kind_of_engine(engine.getKind_of_engine())
                .combined_consumption_from(engine.getCombined_consumption_from())
                .combined_consumption_to(engine.getCombined_consumption_to())
                .co2_emissions_from(engine.getCo2_emissions_from())
                .co2_emissions_to(engine.getCo2_emissions_to())
                .maximum_speed(engine.getMaximum_speed())
                .maximum_torque(engine.getMaximum_torque())
                .build();

        return repository.save(engineToSave);
    }

    public Engine findById(long id) {
        return repository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    public List<Engine> findAll() {
        return repository.findAll().stream().sorted(Comparator.comparing(Engine::getId)).toList();
    }

    public Engine updateOne(long id, EngineModel requestEngine) throws Exception {
        Engine engine = repository.findById(id).orElseThrow(EntityNotFoundException::new);

        List<Engine> listOfModels = findAll();
        for(Engine checkEngine : listOfModels){
            if(Objects.equals(requestEngine.getEngine_volume(), checkEngine.getEngine_volume()) && Objects.equals(requestEngine.getGearbox(), checkEngine.getGearbox()) && checkEngine.getId() != id){
                throw new Exception("Same engine is already in a table");
            }
        }

        Model getModel = modelService.findById(requestEngine.getModel_id());

        engine.setModel(getModel);
        engine.setEngine_volume(requestEngine.getEngine_volume());
        engine.setMaximum_performance(requestEngine.getMaximum_performance());
        engine.setGearbox(requestEngine.getGearbox());
        engine.setFuel(requestEngine.getFuel());
        engine.setAcceleration_from_0_to_100(requestEngine.getAcceleration_from_0_to_100());
        engine.setDrive_type(requestEngine.getDrive_type());
        engine.setKind_of_engine(requestEngine.getKind_of_engine());
        engine.setCombined_consumption_from(requestEngine.getCombined_consumption_from());
        engine.setCombined_consumption_to(requestEngine.getCombined_consumption_to());
        engine.setCo2_emissions_from(requestEngine.getCo2_emissions_from());
        engine.setCo2_emissions_to(requestEngine.getCo2_emissions_to());
        engine.setMaximum_speed(requestEngine.getMaximum_speed());
        engine.setMaximum_torque(requestEngine.getMaximum_torque());

        return repository.save(engine);

    }

    public Engine patchOne(long id, JsonPatch patch) {
        Engine engine = repository.findById(id).orElseThrow(EntityNotFoundException::new);
        Engine enginePatched = applyPatchToProduct(patch, engine);
        return repository.save(enginePatched);
    }

    public void deleteById(long id) {
        repository.deleteById(id);
    }


    public void deleteAll() {
        repository.deleteAll();
        repositoryImpl.resetPrimaryKey();
    }

    private Engine applyPatchToProduct(JsonPatch patch, Engine engine) {
        try {
            var objectMapper = new ObjectMapper();
            JsonNode patched = patch.apply(objectMapper.convertValue(engine, JsonNode.class));
            return objectMapper.treeToValue(patched, Engine.class);
        } catch (JsonPatchException | JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}

