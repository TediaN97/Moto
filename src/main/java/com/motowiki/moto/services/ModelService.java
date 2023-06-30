package com.motowiki.moto.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.fge.jsonpatch.JsonPatch;
import com.github.fge.jsonpatch.JsonPatchException;
import com.motowiki.moto.entities.Car;
import com.motowiki.moto.entities.Model;
import com.motowiki.moto.models.ModelModel;
import com.motowiki.moto.repositories.model.ModelRepository;
import com.motowiki.moto.repositories.model.ModelRepositoryImpl;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;

@Service
public class ModelService {
    private final ModelRepository repository;
    private final ModelRepositoryImpl repositoryImpl;

    @Autowired
    private CarService carService;


    public ModelService(ModelRepository repository, ModelRepositoryImpl repositoryImpl) {
        this.repository = repository;
        this.repositoryImpl = repositoryImpl;
    }

    public Model create(ModelModel model) throws Exception {
        List<Model> listOfModels = findAllById(model.getCar_id());
        for(Model checkModel : listOfModels){
            if(Objects.equals(model.getModel(), checkModel.getModel())){
                throw new Exception("Model with this name of model is already in a table");
            }
        }

        Car getCar = carService.findById(model.getCar_id());

        List<String> images = model.getImages();

        byte[][] imageBytesArray = new byte[images.size()][];

        for (int i = 0; i < images.size(); i++) {
            String imageString = images.get(i);
            byte[] imageBytes = Base64.getDecoder().decode(imageString);
            imageBytesArray[i] = imageBytes;
        }


        Model modelToSave = Model.builder()
                .car(getCar)
                .model(model.getModel())
                .bodywork(model.getBodywork())
                .carClass(model.getCar_class())
                .price_from(model.getPrice_from())
                .equipment(model.getEquipment())
                .more_versions(model.getMore_versions())
                .height(model.getHeight())
                .width(model.getWidth())
                .car_length(model.getCar_length())
                .weight(model.getWeight())
                .images(imageBytesArray)
                .build();

        return repository.save(modelToSave);
    }

    public Model findById(long id) {
        return repository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    public List<Model> findAllById(long id) {
        return repository.findAllById(id).stream().sorted(Comparator.comparing(model -> model.getCar().getId())).toList();
    }

    public Model updateOne(long id, ModelModel requestModel) throws Exception {

        Model model = repository.findById(id).orElseThrow(EntityNotFoundException::new);

        List<Model> listOfModels = findAllById(id);
        for(Model checkModel : listOfModels){
            if(Objects.equals(requestModel.getModel(), checkModel.getModel()) && checkModel.getId() != id){
                throw new Exception("Model with this name of model is already in a table");
            }
        }

        Car getCar = carService.findById(requestModel.getCar_id());

        model.setCar(getCar);
        model.setModel(requestModel.getModel());
        model.setBodywork(requestModel.getBodywork());
        model.setCarClass(requestModel.getCar_class());
        model.setPrice_from(requestModel.getPrice_from());
        model.setEquipment(requestModel.getEquipment());
        model.setMore_versions(requestModel.getMore_versions());
        model.setHeight(requestModel.getHeight());
        model.setWidth(requestModel.getWidth());
        model.setCar_length(requestModel.getCar_length());
        model.setWidth(requestModel.getWidth());

        return repository.save(model);
    }

    public Model patchOne(long id, JsonPatch patch) {
        Model model = repository.findById(id).orElseThrow(EntityNotFoundException::new);
        Model modelPatched = applyPatchToProduct(patch, model);
        return repository.save(modelPatched);
    }

    public void deleteById(long id) {
        repository.deleteById(id);
    }


    public void deleteAll() {
        repository.deleteAll();
        repositoryImpl.resetPrimaryKey();
    }

    private Model applyPatchToProduct(JsonPatch patch, Model model) {
        try {
            var objectMapper = new ObjectMapper();
            JsonNode patched = patch.apply(objectMapper.convertValue(model, JsonNode.class));
            return objectMapper.treeToValue(patched, Model.class);
        } catch (JsonPatchException | JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}


