package com.senai.venda.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Libera todas as rotas
                .allowedOrigins("http://127.0.0.1:5500") // Libera o front-end local
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Métodos permitidos
                .allowedHeaders("*") // Libera todos os headers
                .allowCredentials(true) // Permite cookies, autenticação, etc.
                .maxAge(3600); // Tempo em segundos que o navegador pode cachear a resposta CORS
    }
}
