// app/home/components/FilterSection.tsx
"use client";

import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Constants
export const DEPARTMENTS = ["Information Technology", "Computer Science"];
export const YEARS = ["2025", "2024", "2023"];
export const COURSES = [
  "SIA",
  "Capstone Project",
  "Compiler Design",
  "Thesis Writing",
];
export const SORT_OPTIONS = [
  { value: "recent", label: "Most Recent" },
  { value: "oldest", label: "Oldest First" },
  { value: "title-asc", label: "Title (A-Z)" },
  { value: "title-desc", label: "Title (Z-A)" },
  { value: "year-recent", label: "Year (Recent)" },
  { value: "year-oldest", label: "Year (Oldest)" },
];

// Types
export interface FilterState {
  departments: string[];
  years: string[];
  startYear: string;
  endYear: string;
  courses: string[];
  sortOption: string;
}

interface FilterSectionProps {
  filters: FilterState;
  onFiltersChange: (filters: Partial<FilterState>) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
  hasPendingChanges: boolean;
  theme?: string;
}

// Reusable Components
const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section>
    <h2 className="font-bold text-gold">{title}</h2>
    {children}
  </section>
);

const CheckboxList = ({
  items,
  selected,
  onChange,
  disabled = false,
  prefix = "",
}: {
  items: string[];
  selected: string[];
  onChange: (item: string, checked: boolean) => void;
  disabled?: boolean;
  prefix?: string;
}) => (
  <>
    {items.map((item) => (
      <div key={item} className="flex items-center gap-2 ml-2">
        <Checkbox
          id={`${prefix}${item}`}
          checked={selected.includes(item)}
          onCheckedChange={(checked) => onChange(item, !!checked)}
          disabled={disabled}
        />
        <label htmlFor={`${prefix}${item}`}>{item}</label>
      </div>
    ))}
  </>
);

export function FilterSection({
  filters,
  onFiltersChange,
  onApplyFilters,
  onClearFilters,
  hasPendingChanges,
  theme = "light",
}: FilterSectionProps) {
  const handleDepartmentChange = (dept: string, checked: boolean) => {
    const newDepts = checked
      ? [...filters.departments, dept]
      : filters.departments.filter((d) => d !== dept);
    onFiltersChange({ departments: newDepts });
  };

  const handleYearChange = (year: string, checked: boolean) => {
    const newYears = checked
      ? [...filters.years, year]
      : filters.years.filter((y) => y !== year);
    onFiltersChange({ years: newYears });
  };

  const handleCourseChange = (course: string, checked: boolean) => {
    const newCourses = checked
      ? [...filters.courses, course]
      : filters.courses.filter((c) => c !== course);
    onFiltersChange({ courses: newCourses });
  };

  const handleStartYearChange = (value: string) => {
    onFiltersChange({
      startYear: value,
      years: value && filters.endYear ? [] : filters.years,
    });
  };

  const handleEndYearChange = (value: string) => {
    onFiltersChange({
      endYear: value,
      years: value && filters.startYear ? [] : filters.years,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Filter Results</h1>

      <Section title="Program">
        <CheckboxList
          items={DEPARTMENTS}
          selected={filters.departments}
          onChange={handleDepartmentChange}
          prefix="dept-"
        />
      </Section>

      <Section title="Publication Year">
        <CheckboxList
          items={YEARS}
          selected={filters.years}
          onChange={handleYearChange}
          disabled={Boolean(filters.startYear && filters.endYear)}
          prefix="year-"
        />
        <div className="flex flex-col gap-2 ml-2 mt-2">
          <p className="text-sm">Custom Range:</p>
          <span className="flex gap-2">
            <input
              type="number"
              placeholder="Start year"
              value={filters.startYear}
              onChange={(e) => handleStartYearChange(e.target.value)}
              className="border p-1 rounded-md text-sm w-20"
            />
            <input
              type="number"
              placeholder="End year"
              value={filters.endYear}
              onChange={(e) => handleEndYearChange(e.target.value)}
              className="border p-1 rounded-md text-sm w-20"
            />
          </span>
        </div>
      </Section>

      <Section title="Course">
        <CheckboxList
          items={COURSES}
          selected={filters.courses}
          onChange={handleCourseChange}
          prefix="course-"
        />
      </Section>

      <Section title="Sort By">
        <div className=" mt-2">
          <Select
            value={filters.sortOption}
            onValueChange={(value) => onFiltersChange({ sortOption: value })}
          >
            <SelectTrigger className={`w-full cursor-pointer dark:bg-secondary`}>
              <SelectValue placeholder="Choose sorting..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {SORT_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </Section>

      {hasPendingChanges && (
        <div className="p-2 bg-gold/30 text-gold-fg rounded-md">
          <p className="text-sm italic ">
            You have unsaved filter changes
          </p>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={onApplyFilters}
          className={`${hasPendingChanges ? "bg-yale-blue hover:brightness-110" : "bg-yale-blue/50"} transition-all duration-300 p-2 rounded-md cursor-pointer text-white`}
          disabled={!hasPendingChanges}
        >
          Apply Filters {hasPendingChanges && "⚡"}
        </button>
        <button
          type="button"
          onClick={onClearFilters}
          className={`${theme === "light" ? "border-white-5" : "border-white-50"} border transition-all duration-300 p-2 rounded-md cursor-pointer`}
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}

// Mobile Filter Component
export function MobileFilterSection({
  filters,
  onFiltersChange,
  onApplyFilters,
  onClearFilters,
  hasPendingChanges,
  theme = "light",
}: FilterSectionProps) {
  const handleDepartmentChange = (dept: string, checked: boolean) => {
    const newDepts = checked
      ? [...filters.departments, dept]
      : filters.departments.filter((d) => d !== dept);
    onFiltersChange({ departments: newDepts });
  };

  const handleCourseChange = (course: string, checked: boolean) => {
    const newCourses = checked
      ? [...filters.courses, course]
      : filters.courses.filter((c) => c !== course);
    onFiltersChange({ courses: newCourses });
  };

  return (
    <>
      <Select
        value={filters.sortOption}
        onValueChange={(value) => onFiltersChange({ sortOption: value })}
      >
        <SelectTrigger className={`w-full ${theme === "light" ? "bg-accent border-white-50" : "bg-dusk border-white-5"}`}>
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {SORT_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <div
        className={`${theme === "light" ? "bg-white-50" : "bg-white-5"} h-0.5 w-auto mb-2 mt-2 mx-1`}
      />

      <p className="text-lg">Department</p>
      <ul className="ml-1 flex flex-col gap-1">
        {DEPARTMENTS.map((dept) => (
          <li key={dept}>
            <Checkbox
              id={`dept-mobile-${dept}`}
              checked={filters.departments.includes(dept)}
              onCheckedChange={(checked) =>
                handleDepartmentChange(dept, !!checked)
              }
            />
            <label htmlFor={`dept-mobile-${dept}`}> {dept}</label>
          </li>
        ))}
      </ul>

      <div
        className={`${theme === "light" ? "bg-white-50" : "bg-white-5"} h-0.5 w-auto mb-2 mt-2 mx-2`}
      />

      <p className="text-lg">Course</p>
      <ul className="ml-1 flex flex-col gap-1">
        {COURSES.map((course) => (
          <li key={course}>
            <Checkbox
              id={`course-mobile-${course}`}
              checked={filters.courses.includes(course)}
              onCheckedChange={(checked) =>
                handleCourseChange(course, !!checked)
              }
            />
            <label htmlFor={`course-mobile-${course}`}> {course}</label>
          </li>
        ))}
      </ul>

      {hasPendingChanges && (
        <div className="p-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md mt-2">
          <p className="text-xs text-yellow-800 dark:text-yellow-200">
            Unsaved changes
          </p>
        </div>
      )}

      <div className="flex flex-col gap-2 mt-4">
        <button
          type="button"
          onClick={onClearFilters}
          className={`${theme === "light" ? "bg-white-50" : "bg-white-5"} p-2 w-full rounded-sm cursor-pointer`}
        >
          Clear Filters
        </button>
        <button
          type="button"
          onClick={onApplyFilters}
          className={`${hasPendingChanges ? "bg-gold" : "bg-gold/50"} p-2 w-full rounded-sm cursor-pointer text-white`}
          disabled={!hasPendingChanges}
        >
          Apply Filters {hasPendingChanges && "⚡"}
        </button>
      </div>
    </>
  );
}
