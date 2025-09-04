scoreboard objectives add sky_world.init dummy
execute unless score #init sky_world.init matches 1 run function sky_world:place_island
execute unless score #init sky_world.init matches 1 run scoreboard players set #init sky_world.init 1

