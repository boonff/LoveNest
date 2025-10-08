scoreboard objectives add foand.init dummy
execute unless score #init foand.init matches 1 run function foand:place_island
execute unless score #init foand.init matches 1 run scoreboard players set #init foand.init 1

