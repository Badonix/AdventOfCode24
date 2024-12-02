package main

import (
	"bufio"
	"fmt"
	"log"
	"math"
	"os"
	"strconv"
	"strings"
)

func main() {
	file, err := os.Open("input.txt")
	defer file.Close()
	if err != nil {
		log.Fatalf("failed to open")
	}
	scanner := bufio.NewScanner(file)
	scanner.Split(bufio.ScanLines)
	count := 0
	for scanner.Scan() {
		line := scanner.Text()
		list := strings.Split(line, " ")
		numArray := convertArrayOfStringsToInt(list)
		if checkRange(numArray) && checkIsMonotonic(numArray) {
			count++
		}
	}
	fmt.Println(count)
}

func checkRange(list []int) bool {
	isOkay := true
	for index, item := range list {
		if index == len(list)-1 {
			break
		}
		difference := math.Abs(float64(item - list[index+1]))
		if difference == 0 || difference > 3 {
			isOkay = false
		}
	}
	return isOkay
}

func convertArrayOfStringsToInt(list []string) []int {
	output := []int{}
	for _, i := range list {
		j, err := strconv.Atoi(i)
		if err != nil {
			panic(err)
		}
		output = append(output, j)
	}
	return output
}

func checkIsMonotonic(list []int) bool {
	isMonotonic := true
	var isIncreasing bool
	for index, item := range list {
		if index+1 == len(list) {
			break
		}
		if item == list[index+1] {
			isMonotonic = false
			break
		}
		if index == 0 {
			isIncreasing = item < list[index+1]
		} else {
			if isIncreasing && item > list[index+1] {
				isMonotonic = false
				break
			} else if !isIncreasing && item < list[index+1] {
				isMonotonic = false
				break
			}
		}
	}
	return isMonotonic
}
