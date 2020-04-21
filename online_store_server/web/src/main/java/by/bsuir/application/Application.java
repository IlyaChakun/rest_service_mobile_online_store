package by.bsuir.application;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = {"by.bsuir"})
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

/*


    4 при добавлениипродукта дать возможность либо использовать старый бренд либо добавить новый
    7 РАСШИРИТЬ ПОЛЯ прдукта , добавить доставку как поле и работаь с ней при заказе

 */
