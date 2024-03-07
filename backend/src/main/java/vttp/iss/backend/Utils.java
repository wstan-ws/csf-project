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

    public static final String SQL_GET_USER_USERNAME_PASSWORD = """
            SELECT username, password
            FROM users
            """;

    public static final String SQL_GET_MERCHANT_USERNAME_PASSWORD = """
            SELECT username, password
            FROM merchants
            """;

    public static final String SQL_GET_USER_DETAILS = """
            SELECT *
            FROM users
            WHERE username = ?
            """;

    public static final String SQL_EDIT_USER_DETAILS = """
            UPDATE users
            SET first_name = ?,
                last_name = ?,
                email = ?,
                phone_number = ?,
                address = ?
            WHERE username = ?
            """;

    public static final String SQL_EDIT_USER_PASSWORD = """
            UPDATE users
            SET password = ?
            WHERE username = ?
            """;

    public static final String SQL_GET_MERCHANT_DETAILS = """
            SELECT *
            FROM merchants
            WHERE username = ?
            """;

    public static final String SQL_EDIT_MERCHANT_PASSWORD = """
            UPDATE merchants
            SET password = ?
            WHERE username = ?        
            """;
}
