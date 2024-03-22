package vttp.iss.backend.repositories;

import java.io.StringReader;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;
import vttp.iss.backend.Utils;
import vttp.iss.backend.models.LoginDetails;
import vttp.iss.backend.models.User;

@Repository
public class UserRepository {
    
    @Autowired
    private JdbcTemplate template;

    public void userSignup(User user) {
        
        template.update(Utils.SQL_INSERT_USER, 
            user.getFirstName(),
            user.getLastName(),
            user.getEmail(),
            user.getPhoneNumber(),
            user.getAddress(),
            user.getPostalCode(),
            user.getUsername(),
            user.getPassword());
    }

    public List<LoginDetails> getUsersLoginDetails() {

        SqlRowSet rs = template.queryForRowSet(Utils.SQL_GET_USER_USERNAME_PASSWORD);
        List<LoginDetails> loginDetailsList = new ArrayList<>();
        while (rs.next()) {
            String username = rs.getString("username");
            String password = rs.getString("password");
            LoginDetails loginDetails = new LoginDetails(username, password);
            loginDetailsList.add(loginDetails);
        }

        return loginDetailsList;
    }

    public User getUserDetails(String filter) {

        User user = null;
        
        SqlRowSet rs = template.queryForRowSet(Utils.SQL_GET_USER_DETAILS, filter);
        while (rs.next()) {
            String firstName = rs.getString("first_name");
            String lastName = rs.getString("last_name");
            String email = rs.getString("email");
            String phoneNumber = rs.getString("phone_number");
            String address = rs.getString("address");
            String postalCode = rs.getString("postal_code");
            String username = rs.getString("username");
            String password = rs.getString("password");
            user = new User(firstName, lastName, email, phoneNumber, address, postalCode, username, password);
        }
        
        return user;
    }

    public void editUserDetails(String username, String payload) {

        JsonReader reader = Json.createReader(new StringReader(payload));
        JsonObject o = reader.readObject();
        String firstName = o.getString("firstName");
        String lastName = o.getString("lastName");
        String email = o.getString("email");
        String phoneNumber = o.getString("phoneNumber");
        String address = o.getString("address");
        String postalCode = o.getString("postalCode");

        template.update(
            Utils.SQL_EDIT_USER_DETAILS, 
            firstName, 
            lastName, 
            email, 
            phoneNumber, 
            address,
            postalCode,
            username
        );
    }

    public void editUserPassword(String username, String password) {

        template.update(
            Utils.SQL_EDIT_USER_PASSWORD,
            password,
            username
        );
    }
}
