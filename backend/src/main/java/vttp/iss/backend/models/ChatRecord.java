package vttp.iss.backend.models;

public class ChatRecord {
    
    private int chatId;

    private String user;

    private String merchant;

    private String lastMessage;

    private String timestamp;

    public ChatRecord() {
    }

    public ChatRecord(String user, String merchant, String timestamp) {
        this.user = user;
        this.merchant = merchant;
        this.timestamp = timestamp;
    }

    public ChatRecord(int chatId, String user, String merchant, String lastMessage, String timestamp) {
        this.chatId = chatId;
        this.user = user;
        this.merchant = merchant;
        this.lastMessage = lastMessage;
        this.timestamp = timestamp;
    }

    public int getChatId() {
        return chatId;
    }

    public void setChatId(int chatId) {
        this.chatId = chatId;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getMerchant() {
        return merchant;
    }

    public void setMerchant(String merchant) {
        this.merchant = merchant;
    }

    public String getLastMessage() {
        return lastMessage;
    }

    public void setLastMessage(String lastMessage) {
        this.lastMessage = lastMessage;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    @Override
    public String toString() {
        return "ChatRecord [chatId=" + chatId + ", user=" + user + ", merchant=" + merchant + ", lastMessage="
                + lastMessage + ", timestamp=" + timestamp + "]";
    }
}
