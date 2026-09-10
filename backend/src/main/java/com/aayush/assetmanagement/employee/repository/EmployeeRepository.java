package com.aayush.assetmanagement.employee.repository;

import com.aayush.assetmanagement.employee.entity.Employee;
import com.aayush.assetmanagement.employee.enums.EmployeeStatus;
import com.aayush.assetmanagement.user.entity.User;
import com.aayush.assetmanagement.user.enums.Role;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    Optional<Employee> findByEmployeeCode(String employeeCode);

    boolean existsByEmployeeCode(String employeeCode);

    Optional<Employee> findByUser(User user);

    Optional<Employee> findByUserId(Long userId);

    boolean existsByUser(User user);

    boolean existsByUserId(Long userId);

    @Query("""
            SELECT COUNT(e)
            FROM Employee e
            WHERE e.user.role = :role
            """)
    long countByRole(Role role);

    @Query("""
            SELECT e
            FROM Employee e
            WHERE e.user.role = :role
            ORDER BY e.firstName, e.lastName
            """)
    List<Employee> findByUserRole(Role role);

    @Query("""
            SELECT e.department, COUNT(e)
            FROM Employee e
            GROUP BY e.department
            ORDER BY COUNT(e) DESC
            """)
    List<Object[]> countEmployeesByDepartment();

    long countByStatus(EmployeeStatus status);
}