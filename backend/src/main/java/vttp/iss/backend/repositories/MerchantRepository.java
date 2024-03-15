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
import vttp.iss.backend.models.Merchant;

@Repository
public class MerchantRepository {
    
    @Autowired
    private JdbcTemplate template;

    public void merchantSignup(Merchant merchant) {
        
        template.update(Utils.SQL_INSERT_MERCHANT,
            merchant.getFirstName(),
            merchant.getLastName(),
            merchant.getEmail(),
            merchant.getPhoneNumber(),
            merchant.getCompanyName(),
            merchant.getUsername(),
            merchant.getPassword(),
            merchant.getElec(),
            merchant.getElecLicenseNo(),
            merchant.getPlum(),
            merchant.getPlumLicenseNo(),
            merchant.getAircon(),
            merchant.getAirconLicenseNo());
    }

    public List<LoginDetails> getMerchantsLoginDetails() {

        SqlRowSet rs = template.queryForRowSet(Utils.SQL_GET_MERCHANT_USERNAME_PASSWORD);
        List<LoginDetails> loginDetailsList = new ArrayList<>();
        while (rs.next()) {
            String username = rs.getString("username");
            String password = rs.getString("password");
            LoginDetails loginDetails = new LoginDetails(username, password);
            loginDetailsList.add(loginDetails);
        }

        return loginDetailsList;
    }

    public Merchant getMerchantDetails(String filter) {

        Merchant merchant = null;
        
        SqlRowSet rs = template.queryForRowSet(Utils.SQL_GET_MERCHANT_DETAILS, filter);
        while (rs.next()) {
            String firstName = rs.getString("first_name");
            String lastName = rs.getString("last_name");
            String email = rs.getString("email");
            String phoneNumber = rs.getString("phone_number");
            String companyName = rs.getString("company_name");
            String username = rs.getString("username");
            String password = rs.getString("password");
            Boolean elec = rs.getBoolean("electrician");
            String elecLicenseNo = rs.getString("electrician_license_no");
            Boolean plum = rs.getBoolean("plumber");
            String plumLicenseNo = rs.getString("plumber_license_no");
            Boolean aircon = rs.getBoolean("aircon");
            String airconLicenseNo = rs.getString("aircon_license_no");
            merchant = new Merchant(firstName, lastName, email, phoneNumber, companyName, username, password, elec, elecLicenseNo, plum, plumLicenseNo, aircon, airconLicenseNo);
        }
        
        return merchant;
    } 

    public void editMerchantDetails(String username, String payload) {

        JsonReader reader = Json.createReader(new StringReader(payload));
        JsonObject o = reader.readObject();
        String firstName = o.getString("firstName");
        String lastName = o.getString("lastName");
        String email = o.getString("email");
        String phoneNumber = o.getString("phoneNumber");
        String companyName = o.getString("companyName");
        Boolean elec = o.getBoolean("elec");
        String elecLicenseNo = o.getString("elecLicenseNo");
        Boolean plum = o.getBoolean("plum");
        String plumLicenseNo = o.getString("plumLicenseNo");
        Boolean aircon = o.getBoolean("aircon");
        String airconLicenseNo = o.getString("airconLicenseNo");


        template.update(
            Utils.SQL_EDIT_MERCHANT_DETAILS, 
            firstName, 
            lastName, 
            email, 
            phoneNumber, 
            companyName,
            elec,
            elecLicenseNo,
            plum,
            plumLicenseNo,
            aircon,
            airconLicenseNo,
            username
        );
    }

    public void editMerchantPassword(String username, String password) {

        template.update(
            Utils.SQL_EDIT_MERCHANT_PASSWORD,
            password,
            username
        );
    }

    public List<Merchant> getElectricians() {

        SqlRowSet rs = template.queryForRowSet(Utils.SQL_GET_ELECTRICIANS, 1);

        List<Merchant> merchantList = new ArrayList<>();
        while (rs.next()) {
            String firstName = rs.getString("first_name");
            String lastName = rs.getString("last_name");
            String email = rs.getString("email");
            String phoneNumber = rs.getString("phone_number");
            String companyName = rs.getString("company_name");
            String username = rs.getString("username");
            String password = rs.getString("password");
            Boolean elec = rs.getBoolean("electrician");
            String elecLicenseNo = rs.getString("electrician_license_no");
            Boolean plum = rs.getBoolean("plumber");
            String plumLicenseNo = rs.getString("plumber_license_no");
            Boolean aircon = rs.getBoolean("aircon");
            String airconLicenseNo = rs.getString("aircon_license_no");
            Merchant merchant = new Merchant(firstName, lastName, email, phoneNumber, companyName, username, password, elec, elecLicenseNo, plum, plumLicenseNo, aircon, airconLicenseNo);
            merchantList.add(merchant);
        }

        return merchantList;
    }

    public List<Merchant> getPlumbers() {

        SqlRowSet rs = template.queryForRowSet(Utils.SQL_GET_PLUMBERS, 1);

        List<Merchant> merchantList = new ArrayList<>();
        while (rs.next()) {
            String firstName = rs.getString("first_name");
            String lastName = rs.getString("last_name");
            String email = rs.getString("email");
            String phoneNumber = rs.getString("phone_number");
            String companyName = rs.getString("company_name");
            String username = rs.getString("username");
            String password = rs.getString("password");
            Boolean elec = rs.getBoolean("electrician");
            String elecLicenseNo = rs.getString("electrician_license_no");
            Boolean plum = rs.getBoolean("plumber");
            String plumLicenseNo = rs.getString("plumber_license_no");
            Boolean aircon = rs.getBoolean("aircon");
            String airconLicenseNo = rs.getString("aircon_license_no");
            Merchant merchant = new Merchant(firstName, lastName, email, phoneNumber, companyName, username, password, elec, elecLicenseNo, plum, plumLicenseNo, aircon, airconLicenseNo);
            merchantList.add(merchant);
        }

        return merchantList;
    }

    public List<Merchant> getAircons() {

        SqlRowSet rs = template.queryForRowSet(Utils.SQL_GET_AIRCONS, 1);

        List<Merchant> merchantList = new ArrayList<>();
        while (rs.next()) {
            String firstName = rs.getString("first_name");
            String lastName = rs.getString("last_name");
            String email = rs.getString("email");
            String phoneNumber = rs.getString("phone_number");
            String companyName = rs.getString("company_name");
            String username = rs.getString("username");
            String password = rs.getString("password");
            Boolean elec = rs.getBoolean("electrician");
            String elecLicenseNo = rs.getString("electrician_license_no");
            Boolean plum = rs.getBoolean("plumber");
            String plumLicenseNo = rs.getString("plumber_license_no");
            Boolean aircon = rs.getBoolean("aircon");
            String airconLicenseNo = rs.getString("aircon_license_no");
            Merchant merchant = new Merchant(firstName, lastName, email, phoneNumber, companyName, username, password, elec, elecLicenseNo, plum, plumLicenseNo, aircon, airconLicenseNo);
            merchantList.add(merchant);
        }

        return merchantList;
    }
}
