package vttp.iss.backend;

public class Utils {
        // User
        public static final String SQL_INSERT_USER = """
                INSERT INTO users
                (first_name, last_name, email, phone_number, address, postal_code, username, password)
                VALUES
                (?, ?, ?, ?, ?, ?, ?, ?)
        """;

        public static final String SQL_GET_USER_USERNAME_PASSWORD = """
                SELECT username, password
                FROM users
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
                address = ?,
                postal_code = ?
                WHERE username = ?
        """;

        public static final String SQL_EDIT_USER_PASSWORD = """
                UPDATE users
                SET password = ?
                WHERE username = ?
        """;


        // Merchant
        public static final String SQL_INSERT_MERCHANT = """
                INSERT INTO merchants
                (first_name, last_name, email, phone_number, company_name, postal_code, username, password, electrician, electrician_license_no, plumber, plumber_license_no, aircon, aircon_license_no)
                VALUES
                (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """;

        public static final String SQL_GET_MERCHANT_USERNAME_PASSWORD = """
                SELECT username, password
                FROM merchants
        """;

        public static final String SQL_GET_MERCHANT_DETAILS = """
                SELECT *
                FROM merchants
                WHERE username = ?
        """;

        public static final String SQL_EDIT_MERCHANT_DETAILS = """
                UPDATE merchants
                SET first_name = ?,
                last_name = ?,
                email = ?,
                phone_number = ?,
                company_name = ?,
                postal_code = ?,
                electrician = ?,
                electrician_license_no = ?,
                plumber = ?,
                plumber_license_no = ?,
                aircon = ?,
                aircon_license_no = ?
                WHERE username = ?
        """;

        public static final String SQL_EDIT_MERCHANT_PASSWORD = """
                UPDATE merchants
                SET password = ?
                WHERE username = ?        
        """;

        public static final String SQL_GET_ELECTRICIANS = """
                SELECT *
                FROM merchants
                WHERE electrician = ?
                AND active = ?                
        """;

        public static final String SQL_GET_PLUMBERS = """
                SELECT *
                FROM merchants
                WHERE plumber = ?
                AND active = ?                                
        """;

        public static final String SQL_GET_AIRCONS = """
                SELECT *
                FROM merchants
                WHERE aircon = ?  
                AND active = ?                              
        """;

        public static final String SQL_SET_ACTIVE = """
                UPDATE merchants
                SET active = ?
                WHERE username = ?                
        """;

        // Messages
        public static final String SQL_POST_CHAT_RECORD = """
                INSERT INTO chats
                (user, merchant)
                VALUES
                (?, ?)
        """;

        public static final String SQL_GET_CONVERSATIONS_MERCHANT = """
                SELECT *
                FROM chats
                WHERE merchant = ?               
        """;
        public static final String SQL_GET_CONVERSATIONS_USER = """
                SELECT *
                FROM chats
                WHERE user = ?               
        """;
}
