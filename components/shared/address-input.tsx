"use client";

import React, { useState, useEffect, useRef } from "react";

interface AddressSuggestion {
  id: string;
  value: string;
  description?: string;
}

interface Props {
  onChange?: (value?: string) => void;
  placeholder?: string;
  apiKey?: string;
}

export const AddressInput: React.FC<Props> = ({
  onChange,
  placeholder = "Введіть адресу доставки",
  apiKey = process.env.NOVA_POSHTA_KEY,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionRef = useRef<HTMLDivElement>(null);

  const fetchNovaPoshtaAddresses = async (query: string) => {
    if (!query || query.length < 3) return;

    setLoading(true);

    try {
      const response = await fetch("https://api.novaposhta.ua/v2.0/json/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          apiKey: apiKey,
          modelName: "Address",
          calledMethod: "searchSettlements",
          methodProperties: {
            CityName: query,
            Limit: 10,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.data && data.data[0] && data.data[0].Addresses) {
        const transformedSuggestions = data.data[0].Addresses.map(
          (item: any) => ({
            id: item.Ref || String(Math.random()),
            value: `${item.Present}, ${item.Area}`,
            description:
              item.Warehouses > 0 ? `Відділень: ${item.Warehouses}` : undefined,
          })
        );

        setSuggestions(transformedSuggestions);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Помилка при отриманні адресних підказок:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionRef.current &&
        !suggestionRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.length >= 3) {
      fetchNovaPoshtaAddresses(value);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }

    onChange?.(value);
  };

  const handleSuggestionClick = (suggestion: AddressSuggestion) => {
    setInputValue(suggestion.value);
    onChange?.(suggestion.value);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => inputValue.length >= 3 && setShowSuggestions(true)}
        placeholder={placeholder}
        className="w-full py-3 px-4 border border-gray-300 rounded-lg text-base outline-none transition-colors focus:border-blue-500 focus:shadow-outline"
      />

      {showSuggestions && (
        <div
          ref={suggestionRef}
          className="absolute z-10 w-full max-h-64 overflow-y-auto bg-white border border-gray-300 rounded-b-lg mt-0.5 shadow-md"
        >
          {loading ? (
            <div className="py-3 px-4 text-center text-gray-600">
              Завантаження...
            </div>
          ) : suggestions.length > 0 ? (
            suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className="py-2.5 px-4 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <div>{suggestion.value}</div>
                {suggestion.description && (
                  <div className="text-sm text-gray-500">
                    {suggestion.description}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="py-3 px-4 text-center text-gray-600">
              Немає підказок для відображення
            </div>
          )}
        </div>
      )}
    </div>
  );
};
