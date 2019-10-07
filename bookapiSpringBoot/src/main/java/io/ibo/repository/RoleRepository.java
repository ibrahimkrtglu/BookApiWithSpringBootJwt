package io.ibo.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import io.ibo.model.Role;
import io.ibo.model.RoleName;

@Repository
public interface RoleRepository extends CrudRepository<Role,Long> {

	Optional<Role> findByName(RoleName roleName);
}
