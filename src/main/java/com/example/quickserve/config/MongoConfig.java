package com.example.quickserve.config;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoClientConfiguration;

@Configuration
public class MongoConfig extends AbstractMongoClientConfiguration {

    @Override
    protected String getDatabaseName() {
        return "quickserve_db"; // ඔයාගේ Database එකේ නම
    }

    @Override
    public MongoClient mongoClient() {
        // ඔයාගේ Atlas Connection String එක මෙතන තියෙනවා
        ConnectionString connectionString = new ConnectionString("mongodb+srv://sasankadilum372_db_user:yvaBZbvQBm8VRwUs@cluster0.wpmonyf.mongodb.net/quickserve_db?retryWrites=true&w=majority&appName=Cluster0");
        MongoClientSettings mongoClientSettings = MongoClientSettings.builder()
                .applyConnectionString(connectionString)
                .build();

        return MongoClients.create(mongoClientSettings);
    }
}