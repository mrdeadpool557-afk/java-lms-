package com.lms.demo.config;

import com.lms.demo.entity.Course;
import com.lms.demo.entity.User;
import com.lms.demo.repository.CourseRepository;
import com.lms.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            
            User admin = new User();
            admin.setEmail("admin@lms.com");
            admin.setPassword(encoder.encode("admin123"));
            admin.setName("Admin User");
            admin.setRole(User.Role.ADMIN);
            userRepository.save(admin);

            User instructor = new User();
            instructor.setEmail("instructor@lms.com");
            instructor.setPassword(encoder.encode("instructor123"));
            instructor.setName("Dr. Sarah Smith");
            instructor.setRole(User.Role.INSTRUCTOR);
            userRepository.save(instructor);

            Course course1 = new Course();
            course1.setTitle("Full Stack Web Development with React & Node");
            course1.setDescription("Master modern web development from scratch.");
            course1.setPrice(new BigDecimal("89.99"));
            course1.setCategory("Development");
            course1.setThumbnail("https://picsum.photos/seed/web/800/450");
            course1.setInstructor(instructor);
            courseRepository.save(course1);
            
            Course course2 = new Course();
            course2.setTitle("Advanced Data Science & Machine Learning");
            course2.setDescription("Deep dive into data science and ML algorithms.");
            course2.setPrice(new BigDecimal("129.99"));
            course2.setCategory("Data Science");
            course2.setThumbnail("https://picsum.photos/seed/data/800/450");
            course2.setInstructor(instructor);
            courseRepository.save(course2);
        }
    }
}
