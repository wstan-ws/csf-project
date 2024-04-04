package vttp.iss.backend.repositories;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import vttp.iss.backend.Utils;
import vttp.iss.backend.models.PostReview;
import vttp.iss.backend.models.Review;

@Repository
public class ReviewRepository {
    
    @Autowired
    private JdbcTemplate template;

    public void postReview(Review review, String merchant) {

        template.update(Utils.SQL_POST_REVIEW,
            review.getJobId(),
            review.getRating(),
            review.getComments(),
            review.getDate(),
            review.getTime()
        );

        SqlRowSet rs = template.queryForRowSet(Utils.SQL_GET_AVG_RATING, merchant);

        Integer length = 0;
        Double ratings = 0.0;

        while (rs.next()) {
            length++;
            Integer rating = rs.getInt("rating");
            ratings += rating;
        }

        Double avgRating = ratings/length;
        String avg = new DecimalFormat("#.##").format(avgRating);
        
        template.update(Utils.SQL_SET_MERCHANT_RATING, avg, merchant);
    }

    public List<PostReview> getReviewByMerchant(String merchant) {

        SqlRowSet rs = template.queryForRowSet(Utils.SQL_GET_AVG_RATING, merchant);

        List<PostReview> reviewList = new ArrayList<>();
        while (rs.next()) {
            PostReview review = new PostReview();
            if (rs.getString("comments") == null) {
                String user = rs.getString("user_username");
                Integer rating = rs.getInt("rating");
                String comments = "";
                String date = rs.getString("date");
                review = new PostReview(user, comments, rating, date);
            } else {
                String user = rs.getString("user_username");
                Integer rating = rs.getInt("rating");
                String comments = rs.getString("comments");
                String date = rs.getString("date");
                review = new PostReview(user, comments, rating, date);
            }
            reviewList.add(review);
        }

        return reviewList;
    }
}
