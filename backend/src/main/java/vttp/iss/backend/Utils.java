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
                (first_name, last_name, email, phone_number, company_name, postal_code, username, password, electrician, electrician_license_no, plumber, plumber_license_no, aircon, aircon_license_no, rating)
                VALUES
                (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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

        public static final String SQL_FIND_MERCHANT_BY_NAME_ELEC = """
                SELECT *
                FROM merchants
                WHERE (first_name LIKE ?
                OR last_name LIKE ?)
                AND electrician = 1
                AND active = 1
        """;

        public static final String SQL_FIND_MERCHANT_BY_NAME_AIRCON = """
                SELECT *
                FROM merchants
                WHERE (first_name LIKE ?
                OR last_name LIKE ?)
                AND aircon = 1
                AND active = 1
        """;

        public static final String SQL_FIND_MERCHANT_BY_NAME_PLUM = """
                SELECT *
                FROM merchants
                WHERE (first_name LIKE ?
                OR last_name LIKE ?)
                AND plumber = 1
                AND active = 1
        """;

        public static final String SQL_FIND_MERCHANT_BY_RATING_ELEC = """
                SELECT *
                FROM merchants
                WHERE rating > ?
                AND electrician = 1
                AND active = 1                
        """;

        public static final String SQL_FIND_MERCHANT_BY_RATING_AIRCON = """
                SELECT *
                FROM merchants
                WHERE rating > ?
                AND aircon = 1
                AND active = 1                
        """;

        public static final String SQL_FIND_MERCHANT_BY_RATING_PLUM = """
                SELECT *
                FROM merchants
                WHERE rating > ?
                AND plumber = 1
                AND active = 1                
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

        public static final String SQL_EDIT_LAST_MESSAGE = """
                UPDATE chats
                SET last_message = ?, timestamp = ?
                WHERE user = ? AND merchant = ?               
        """;

        // Jobs
        public static final String SQL_POST_NEW_JOB_REQUEST = """
                INSERT INTO jobs
                (job_id, timestamp, user_username, merchant_username, type, scheduled_date, scheduled_time, user_postal_code, merchant_postal_code, status)
                VALUES
                (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)                
        """;

        public static final String SQL_CHECK_JOB_REQUEST = """
                SELECT *
                FROM jobs
                WHERE user_username = ? 
                AND merchant_username = ?
                AND status = ?                 
        """;

        public static final String SQL_GET_JOBS = """
                SELECT *
                FROM jobs
                WHERE merchant_username = ?
                AND status = ?
                ORDER BY type, scheduled_date, scheduled_time, timestamp        
        """;

        public static final String SQL_EDIT_JOB_REQUEST_STATUS = """
                UPDATE jobs
                SET timestamp = ?, status = ?
                WHERE user_username = ? 
                AND merchant_username = ?
                AND status = ?                
        """;

        public static final String SQL_GET_SERVICES = """
                SELECT *
                FROM jobs
                WHERE user_username = ?
                AND status = ?
                ORDER BY type, scheduled_date, scheduled_time, timestamp               
        """;

        public static final String SQL_USER_GET_ONGOING_JOBS = """
                SELECT *
                FROM jobs
                WHERE job_id = ?
                AND status = ?                
        """;

        public static final String SQL_COMPLETE_REQUEST = """
                UPDATE jobs
                SET status = ?, completed_timestamp = ?
                WHERE user_username = ?
                AND merchant_username = ?
                AND status = ?
                AND job_id = ?                
        """;

        public static final String SQL_GET_MERCHANT_HISTORY = """
                SELECT *
                FROM jobs
                WHERE merchant_username = ?
                AND status = ?
                ORDER BY completed_timestamp DESC                 
        """;

        public static final String SQL_GET_MERCHANT_CANCEL_HISTORY = """
                SELECT *
                FROM jobs
                WHERE merchant_username = ?
                AND (status = ? OR status = ?)
                ORDER BY completed_timestamp DESC                 
        """;

        public static final String SQL_GET_USER_HISTORY = """
                SELECT *
                FROM jobs
                WHERE user_username = ?
                AND status = ?
                ORDER BY completed_timestamp DESC                
        """;

        public static final String SQL_GET_USER_CANCEL_HISTORY = """
                SELECT *
                FROM jobs
                WHERE user_username = ?
                AND (status = ? OR status = ?)
                ORDER BY timestamp DESC        
        """;

        public static final String SQL_CANCEL_JOB = """
                UPDATE jobs
                SET timestamp = ?, status = ?
                WHERE job_id = ?
                AND status = 1                
        """;

        // Review
        public static final String SQL_POST_REVIEW = """
                INSERT INTO reviews
                (job_id, rating, comments, date, time)
                VALUES
                (?, ?, ?, ?, ?)                
        """;

        public static final String SQL_GET_AVG_RATING = """
                SELECT * 
                FROM jobs j
                LEFT JOIN reviews r
                ON j.job_id = r.job_id
                WHERE rating IS NOT NULL
                AND j.merchant_username = ?
                ORDER BY r.date DESC           
        """;

        public static final String SQL_SET_MERCHANT_RATING = """
                UPDATE merchants
                SET rating = ?
                WHERE username = ?                
        """;
}
