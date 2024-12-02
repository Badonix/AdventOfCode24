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
		log.Fatal("CANT OPEN FILE")
	}
	count := 0
	scanner := bufio.NewScanner(file)
	scanner.Split(bufio.ScanLines)
	for scanner.Scan() {
		line := scanner.Text()
		list := strings.Split(line, " ")
		numArray := convertArrayOfStringsToInts(list)
		if isSafeWithOneRemoval(numArray) {
			count++
		}
	}
	fmt.Println(count)
}

func isSafe(list []int) bool {
	return checkRange(list) && isMonotonic(list)
}

func isSafeWithOneRemoval(list []int) bool {
	if isSafe(list) {
		return true
	}
	for i := 0; i < len(list); i++ {
		newList := make([]int, 0, len(list)-1)
		for j := 0; j < len(list); j++ {
			if j != i {
				newList = append(newList, list[j])
			}
		}
		if isSafe(newList) {
			return true
		}
	}
	return false
}

func checkRange(list []int) bool {
	isOkay := true
	for index, item := range list {
		if index+1 == len(list) {
			break
		}
		difference := math.Abs(float64(item - list[index+1]))
		if difference == 0 || difference > 3 {
			isOkay = false
			break
		}
	}
	return isOkay
}

func isMonotonic(list []int) bool {
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

func convertArrayOfStringsToInts(list []string) []int {
	output := []int{}
	for _, item := range list {
		j, err := strconv.Atoi(item)
		if err != nil {
			log.Fatal(err)
		}
		output = append(output, j)
	}
	return output
}
