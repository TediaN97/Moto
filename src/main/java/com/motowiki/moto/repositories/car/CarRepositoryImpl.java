package com.motowiki.moto.repositories.car;

import com.motowiki.moto.repositories.EntityRepositoryCustom;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class CarRepositoryImpl implements EntityRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    @Override
    public void resetPrimaryKey() {
        Query query = entityManager.createNativeQuery("ALTER SEQUENCE car_id_seq RESTART WITH 1");
        query.executeUpdate();
    }
}
