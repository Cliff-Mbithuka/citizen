-- Create Users Table
CREATE OR REPLACE PROCEDURE create_users_table()
LANGUAGE plpgsql
AS $$
BEGIN
    CREATE TABLE IF NOT EXISTS Users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) CHECK (role IN ('citizen', 'official', 'admin')) DEFAULT 'citizen'
    );
END;
$$;

-- Create Incidents Table
CREATE OR REPLACE PROCEDURE create_incidents_table()
LANGUAGE plpgsql
AS $$
BEGIN
    CREATE TABLE IF NOT EXISTS Incidents (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        multimedia VARCHAR(255),
        user_id INTEGER REFERENCES Users(id) ON DELETE CASCADE
    );
END;
$$;

-- Create Polls Table
CREATE OR REPLACE PROCEDURE create_polls_table()
LANGUAGE plpgsql
AS $$
BEGIN
    CREATE TABLE IF NOT EXISTS Polls (
        id SERIAL PRIMARY KEY,
        question VARCHAR(255) NOT NULL
    );
END;
$$;

-- Create PollOptions Table
CREATE OR REPLACE PROCEDURE create_poll_options_table()
LANGUAGE plpgsql
AS $$
BEGIN
    CREATE TABLE IF NOT EXISTS PollOptions (
        id SERIAL PRIMARY KEY,
        poll_id INTEGER REFERENCES Polls(id) ON DELETE CASCADE,
        option_text VARCHAR(255) NOT NULL
    );
END;
$$;

-- Create PollVotes Table
CREATE OR REPLACE PROCEDURE create_poll_votes_table()
LANGUAGE plpgsql
AS $$
BEGIN
    CREATE TABLE IF NOT EXISTS PollVotes (
        id SERIAL PRIMARY KEY,
        poll_option_id INTEGER REFERENCES PollOptions(id) ON DELETE CASCADE,
        user_id INTEGER REFERENCES Users(id) ON DELETE CASCADE
    );
END;
$$;