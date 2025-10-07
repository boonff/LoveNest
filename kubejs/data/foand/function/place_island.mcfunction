place structure foand:main_island 0 64 0
execute at @e[type=marker,tag=center_marker,limit=1,sort=nearest] run setworldspawn ~ ~ ~
kill @e[type=marker,tag=center_marker]
