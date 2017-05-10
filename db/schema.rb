# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170510200606) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "followers", force: :cascade do |t|
    t.integer  "user_id",      null: false
    t.integer  "following_id", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "lists", force: :cascade do |t|
    t.string   "name",       null: false
    t.integer  "rank"
    t.integer  "user_id",    null: false
    t.integer  "media_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "media", force: :cascade do |t|
    t.string   "title",        null: false
    t.integer  "data_id",      null: false
    t.text     "overview"
    t.string   "poster_path"
    t.string   "release_date"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "rank"
    t.string   "media_type"
  end

  create_table "media_lists", force: :cascade do |t|
    t.integer  "media_id",   null: false
    t.integer  "list_id",    null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: :cascade do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "username"
    t.string   "email"
    t.string   "city"
    t.string   "state"
    t.string   "provider"
    t.string   "uid"
    t.string   "name"
    t.string   "oauth_token"
    t.datetime "oauth_expires_at"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "image"
    t.integer  "followers_count",  default: 0
    t.integer  "following_count",  default: 0
  end

end
