package pl.sekankodev.hoidlegamelogic;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "pl.sekankodev")
public class HoidleGameLogicApplication {

	public static void main(String[] args) {
		SpringApplication.run(HoidleGameLogicApplication.class, args);
	}

}
