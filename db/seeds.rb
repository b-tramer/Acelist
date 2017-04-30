
btramer = User.create(first_name: "Bradley", last_name: "Tramer", username: "btramer", email: "tramerbrad@gmail.com", city: "Boston", state: "Massachusetts")

rileytramer = User.create(first_name: "Riley", last_name: "Tramer", username: "rtramer", email: "rileytramer@gmail.com", city: "Cleveland", state: "Ohio")

List.create(name: "Animated Movies", rank: 1, user: btramer, media: toy_story)

List.create(name: "Animated Movies", rank: 2, user: btramer, media: toy_story_two)

List.create(name: "Animated Movies", rank: 3, user: btramer, media: toy_story_three)

List.create(name: "Animated Movies", rank: 4, user: btramer, media: finding_nemo)

List.create(name: "Animated Movies", rank: 5, user: btramer, media: monsters_inc)

--------------------

List.create(name: "Inspiring Movies", rank: 1, user: rileytramer, media: social_network)

List.create(name: "Inspiring Movies", rank: 2, user: rileytramer, media: steve_jobs)

List.create(name: "Inspiring Movies", rank: 3, user: rileytramer, media: lion)

List.create(name: "Inspiring Movies", rank: 4, user: rileytramer, media: the_intouchables)

List.create(name: "Inspiring Movies", rank: 5, user: rileytramer, media: good_will_hunting)




User.create(first_name: "Bradley", last_name: "Tramer", username: "btramer", provider: "Facebook")
