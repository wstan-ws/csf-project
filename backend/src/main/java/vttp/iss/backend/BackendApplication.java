package vttp.iss.backend;

import java.io.IOException;
import java.io.InputStream;
import java.util.Objects;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) throws IOException {

		ClassLoader classLoader = BackendApplication.class.getClassLoader();

		InputStream is = Objects.requireNonNull(classLoader.getResourceAsStream("serviceAccountKey.json"));
		// FileInputStream sa = new FileInputStream(is);

		// File file = new File(Objects.requireNonNull(classLoader.getResource("serviceAccountKey.json")).getFile());
		// FileInputStream serviceAccount = new FileInputStream(file.getAbsolutePath());

		// FileInputStream serviceAccount = new FileInputStream("serviceAccountKey.json");

		@SuppressWarnings("deprecation")
		FirebaseOptions options = new FirebaseOptions.Builder()
			.setCredentials(GoogleCredentials.fromStream(is))
			.build();

		if (FirebaseApp.getApps().isEmpty()) {
			FirebaseApp.initializeApp(options);
		} else {
			FirebaseApp.getInstance();
		}

		SpringApplication.run(BackendApplication.class, args);
	}

}
