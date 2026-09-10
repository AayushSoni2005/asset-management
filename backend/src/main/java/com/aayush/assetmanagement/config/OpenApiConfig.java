package com.aayush.assetmanagement.config;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI assetManagementOpenAPI() {

        return new OpenAPI()
                .info(new Info()
                        .title("IT Asset Management System API")
                        .description("""
                                REST APIs for managing employees, equipment,
                                issues, work orders, notifications and analytics.
                                """)
                        .version("v1.0")
                        .contact(new Contact()
                                .name("Aayush Soni")
                                .email("your-email@example.com"))
                        .license(new License()
                                .name("MIT License")))
                .externalDocs(new ExternalDocumentation()
                        .description("Project Documentation"));
    }

}