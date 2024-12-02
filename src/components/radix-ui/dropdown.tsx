import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ReactNode } from 'react';

interface DropdownItem {
  name: string;
  id: string;
}

interface DropdownProps {
  items: DropdownItem[];  // List of items for the dropdown
  onSelect: (item: DropdownItem) => void;  // Callback when an item is selected
  label: string | ReactNode;  // Optional label to display on the dropdown trigger button
}

const Dropdown = ({ items, onSelect, label }: DropdownProps) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="text-grey-400 hover:text-white focus:outline-none">
        {label}
      </DropdownMenu.Trigger>

      <DropdownMenu.Content
        className="w-48 p-2 bg-primary dark:bg-primary-dark border border-gray-300 rounded-lg shadow-lg z-10"
        align="start"
      >
        {items.map((item) => (
          <DropdownMenu.Item
            key={item.id}
            className="px-4 py-2 text-foreground dark:text-foreground-dark hover:bg-secondary cursor-pointer"
            onSelect={() => onSelect(item)}
          >
            {item.name}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default Dropdown;
