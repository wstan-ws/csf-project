package vttp.iss.backend;

public class Utils {
    
    public static final String SQL_INSERT_USER = """
            INSERT INTO users
                (first_name, last_name, email, phone_number, address, username, password)
            VALUES
                (?, ?, ?, ?, ?, ?, ?)
            """;

    public static final String SQL_INSERT_MERCHANT = """
            INSERT INTO merchants
                (first_name, last_name, email, phone_number, company_name, username, password, electrician, electrician_license_no, plumber, plumber_license_no, aircon, aircon_license_no)
            VALUES
                (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """;

    public static final String SQL_GET_USER_USERNAME = """
            SELECT username
            FROM users
            """;
}
