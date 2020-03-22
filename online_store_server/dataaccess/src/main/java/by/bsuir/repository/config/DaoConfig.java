package by.bsuir.repository.config;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EntityScan(basePackages = "by.bsuir.entity")
@EnableJpaRepositories(basePackages = "by.bsuir")
public class DaoConfig {


}

