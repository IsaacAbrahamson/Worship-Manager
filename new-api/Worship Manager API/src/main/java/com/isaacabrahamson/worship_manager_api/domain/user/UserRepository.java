package com.isaacabrahamson.worship_manager_api.domain.user;

import com.isaacabrahamson.worship_manager_api.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
