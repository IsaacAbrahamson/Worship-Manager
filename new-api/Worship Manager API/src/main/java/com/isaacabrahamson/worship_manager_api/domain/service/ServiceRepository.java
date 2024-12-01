package com.isaacabrahamson.worship_manager_api.domain.service;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceRepository extends JpaRepository<Service, Long> {
}
