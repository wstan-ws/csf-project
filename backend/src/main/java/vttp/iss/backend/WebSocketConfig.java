package vttp.iss.backend;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // any endpoint that is prefixed with /topic will have broker send message to that endpoint
        config.enableSimpleBroker("/message");
        // designates /app prefix for messages bound for methods with @MessageMapping annotation
        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // registers /chat endpoint for websocket connections
        registry.addEndpoint("/socket").setAllowedOrigins("https://overhaul.up.railway.app").withSockJS();
    }
    
}
